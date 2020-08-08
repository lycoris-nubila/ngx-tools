import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export const filterNil = <T>(orElse?: T) => (source: Observable<T>) => source.pipe(
    map(value => !value ? orElse : value), filter(value => !!value));
