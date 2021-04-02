import omitBy from 'lodash-es/omitBy';
import {Data$, DataPage$} from './lycoris-types';
import {asyncScheduler, combineLatest, Observable} from 'rxjs';
import {defaultIfEmpty, map, observeOn, throttleTime} from 'rxjs/operators';
import {IEntity} from './models/entity';
import {RemoteData} from './models/remote-data';
import {RemoteDataPage} from './models/remote-data-page';
import isDate from 'lodash-es/isDate';
import isEqual from 'lodash-es/isEqual';
import {DateTime} from 'luxon';
import isObject from 'lodash-es/isObject';

export function isEquals(a: any, b: any) {
  return isEqual((a ?? null), (b ?? null));
}

export function localeDateToDateTime(
  date: Date, timeZone: string): DateTime {
  return isDate(date) ?
    DateTime.fromISO(DateTime.fromJSDate(date).toISO({includeOffset: false}),
      {zone: timeZone}) :
    DateTime.local().setZone(timeZone);
}

export function timestampToLocaleDate(
  timestamp: number, timeZone: string): Date {
  return !!timestamp ?
    dateTimeToLocaleDate(DateTime.fromMillis(timestamp, {zone: timeZone})) :
    new Date();
}

export function dateToLocaleDate(date: Date, timeZone: string): Date {
  return isDate(date) ? timestampToLocaleDate(date.getTime(), timeZone) : null;
}

export function dateTimeToLocaleDate(dateTime: DateTime): Date {
  return dateTime.isValid ?
    new Date(dateTime.toISO({includeOffset: false})) :
    new Date();
}

export function compareEntity<T extends IEntity>(
  document1: T, document2: T): boolean {
  return JSON.stringify(omitBy(document1, (v) => isObject(v))) ===
    JSON.stringify(omitBy(document2, (v) => isObject(v)));
}

export function compareEntities<T extends IEntity>(
  array1: T[], array2: T[]): boolean {
  return (array1 || []).length === (array2 || []).length &&
    array1.every((item1, i) => compareEntity(item1, array2[i]));
}

export function appData<T1, T2>(
  a: Data$<T1>, b: Observable<T2>, throttle = 250): Data$<T2> {
  return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
    map(([api, entity]) => ({
      fresh: api.fresh,
      data: entity,
    } as RemoteData<T2>)),
    throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
    defaultIfEmpty({data: null as T2, fresh: true}));
}

export function appEntity<T1, T2 extends IEntity>(
  a: Data$<T1>, b: Observable<T2>, throttle = 250): Data$<T2> {
  return combineLatest([a, b]).pipe(observeOn(asyncScheduler),
    map(([api, entity]) => ({
      fresh: api.fresh,
      data: entity,
    } as RemoteData<T2>)),
    throttleTime(throttle, asyncScheduler, {leading: true, trailing: true}),
    defaultIfEmpty({data: null as T2, fresh: true}));
}

export function appEntities<T1, T2 extends IEntity>(
  a: Data$<T1[]>, b: Observable<T2[]>, throttle = 250): Data$<T2[]> {
  return combineLatest([a, b]).
    pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
        totalElements: Math.max(api.data?.length ?? 0, entities.length),
        fresh: api.fresh,
        data: (entities || []),
      } as RemoteData<T2[]>)), throttleTime(throttle, asyncScheduler,
      {leading: true, trailing: true}),
      defaultIfEmpty(
        {data: [], fresh: true, totalElements: 0} as RemoteData<T2[]>));
}

export function appEntitiesPage<T1, T2 extends IEntity>(
  a: DataPage$<T1>,
  b: Observable<T2[]>,
  throttle = 250): DataPage$<T2> {
  return combineLatest([a, b]).
    pipe(observeOn(asyncScheduler), map(([api, entities]) => ({
        totalElements: Math.max(api.totalElements, entities.length),
        fresh: api.fresh,
        data: (entities || []),
      } as RemoteData<T2[]>)), throttleTime(throttle, asyncScheduler,
      {leading: true, trailing: true}),
      defaultIfEmpty(
        {data: [], fresh: true, totalElements: 0} as RemoteDataPage<T2>));
}
