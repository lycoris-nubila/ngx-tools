import isEmpty from 'lodash-es/isEmpty';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export const filterEmpty = <T>(orElse?: T) => (source: Observable<T>) => source.pipe(
    map(value => isEmpty(value) ? orElse : value), filter(value => !isEmpty(value)));
