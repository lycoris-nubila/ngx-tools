import isEqualWith from 'lodash-es/isEqualWith';
import omitBy from 'lodash-es/omitBy';
import {Data$, DataPage$} from './lycoris-types';
import {asyncScheduler, combineLatest, Observable} from 'rxjs';
import {defaultIfEmpty, map, observeOn, throttleTime} from 'rxjs/operators';
import {IEntity} from './models/entity';
import {RemoteData} from './models/remote-data';
import {RemoteDataPage} from './models/remote-data-page';

export function compareEntity<T extends IEntity>(document1: T, document2: T) {
    if (!Array.isArray(document1) && !Array.isArray(document2)) {
        return JSON.stringify(omitBy(document1, (v, k) => k.endsWith('$'))) ===
            JSON.stringify(omitBy(document2, (v, k) => k.endsWith('$')));
    }
}

export function compareEntities<T extends IEntity>(array1: T[], array2: T[]): boolean {
    return isEqualWith(array1, array2, (d1, d2) => compareEntity(d1, d2));
}

export function appData<T1, T2>(a: Data$<T1>, b: Observable<T2>, throttle = 250): Data$<T2> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
        map(([api, entity]) => ({fresh: api.fresh, data: entity} as RemoteData<T2>)),
        throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
        defaultIfEmpty({data: null as T2, fresh: true}));
}

export function appEntity<T1, T2 extends IEntity>(a: Data$<T1>, b: Observable<T2>, throttle = 250): Data$<T2> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
        map(([api, entity]) => ({fresh: api.fresh, data: entity} as RemoteData<T2>)),
        throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
        defaultIfEmpty({data: null as T2, fresh: true}));
}

export function appEntities<T1, T2 extends IEntity>(a: Data$<T1[]>, b: Observable<T2[]>, throttle = 250): Data$<T2[]> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
            totalElements: Math.max(api.data?.length ?? 0, entities.length), fresh: api.fresh, data: (entities || []),
        } as RemoteData<T2[]>)), throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
        defaultIfEmpty({data: [], fresh: true, totalElements: 0} as RemoteData<T2[]>));
}

export function appEntitiesPage<T1, T2 extends IEntity>(a: DataPage$<T1>,
                                                        b: Observable<T2[]>,
                                                        throttle = 250): DataPage$<T2> {
    return combineLatest([a, b]).pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
            totalElements: Math.max(api.totalElements, entities.length), fresh: api.fresh, data: (entities || []),
        } as RemoteData<T2[]>)), throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
        defaultIfEmpty({data: [], fresh: true, totalElements: 0} as RemoteDataPage<T2>));
}
