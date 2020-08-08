import isNull from 'lodash-es/isNull';
import isUndefined from 'lodash-es/isUndefined';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export const filterNull = <T>(orElse?: T) => (source: Observable<T>) => source.pipe(
    map(value => isUndefined(value) || isNull(value) ? orElse : value),
    filter(value => !isUndefined(value) && !isNull(value)));
