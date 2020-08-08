import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const catchErrorTo = <T>(v: T, log = true) => (source: Observable<T>) => source.pipe(catchError((e) => {
    if (log) {
        console.log(e);
    }
    return of(v);
}));
