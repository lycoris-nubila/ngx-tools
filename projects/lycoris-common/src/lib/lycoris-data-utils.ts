import isEqualWith from 'lodash-es/isEqualWith';
import {asyncScheduler, combineLatest, Observable} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, filter, map, observeOn} from 'rxjs/operators';
import {LycorisDataDto} from './models/lycoris-data.dto';
import {ILycorisEntity} from './models/lycoris-entity';
import {LycorisPageableDto} from './models/lycoris-pageable.dto';

export function compareEntity<T extends ILycorisEntity>(document1: T,
                                                        document2: T,
                                                        comparator?: (x: T, y: T) => boolean) {
    if (!Array.isArray(document1) && !Array.isArray(document2)) {
        return document1?.updateTimestamp === document2?.updateTimestamp &&
            (!comparator || comparator(document1, document2));
    }
}

export function compareEntities<T extends ILycorisEntity>(array1: T[],
                                                          array2: T[],
                                                          comparator?: (x: T, y: T) => boolean): boolean {
    return isEqualWith(array1, array2, (d1, d2) => compareEntity(d1, d2, comparator));
}

export function appData<T1, T2>(a: Observable<LycorisDataDto<T1>>, b: Observable<T2>): Observable<LycorisDataDto<T2>> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
        map(([api, entity]) => ({fresh: api.fresh, data: entity} as LycorisDataDto<T2>)),
        defaultIfEmpty({data: null as T2, fresh: true}), filter(data => data.fresh || !!data.data));
}

export function appEntity<T1, T2 extends ILycorisEntity>(a: Observable<LycorisDataDto<T1>>,
                                                         b: Observable<T2>,
                                                         comparator?: (x: T2,
                                                                       y: T2) => boolean): Observable<LycorisDataDto<T2>> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
        map(([api, entity]) => ({fresh: api.fresh, data: entity} as LycorisDataDto<T2>)),
        defaultIfEmpty({data: null as T2, fresh: true}), filter(data => data.fresh || !!data.data),
        distinctUntilChanged((d1, d2) => d1.fresh === d2.fresh && compareEntity(d1.data, d2.data, comparator)));
}

export function appEntities<T1, T2 extends ILycorisEntity>(a: Observable<LycorisDataDto<T1[]>>,
                                                           b: Observable<T2[]>,
                                                           comparator?: (x: T2,
                                                                         y: T2) => boolean): Observable<LycorisDataDto<T2[]>> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
            totalElements: Math.max(api.data?.length ?? 0, entities.length), fresh: api.fresh, data: (entities || []),
        } as LycorisDataDto<T2[]>)), defaultIfEmpty({data: [], fresh: true, totalElements: 0} as LycorisDataDto<T2[]>),
        filter(data => data.fresh || (data.data || []).length > 0),
        distinctUntilChanged((d1, d2) => d1.fresh === d2.fresh && compareEntities(d1.data, d2.data, comparator)));
}

export function appEntitiesPage<T1, T2 extends ILycorisEntity>(a: Observable<LycorisPageableDto<T1>>,
                                                               b: Observable<T2[]>,
                                                               comparator?: (x: T2,
                                                                             y: T2) => boolean): Observable<LycorisPageableDto<T2>> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
            totalElements: Math.max(api.totalElements, entities.length), fresh: api.fresh, data: (entities || []),
        } as LycorisDataDto<T2[]>)), defaultIfEmpty({data: [], fresh: true, totalElements: 0} as LycorisPageableDto<T2>),
        filter(data => data.fresh || (data.data || []).length > 0),
        distinctUntilChanged((d1, d2) => d1.fresh === d2.fresh && compareEntities(d1.data, d2.data, comparator)));
}
