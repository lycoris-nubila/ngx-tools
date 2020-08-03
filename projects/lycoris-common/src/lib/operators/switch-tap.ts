import {from, Observable, ObservableInput} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';

export const switchTap =
    <T, O extends ObservableInput<any>>(project: (value: T, index: number) => O) =>
    (source: Observable<T | undefined | null>) => source.pipe(
        switchMap((v, i) => from(project(v, i)).pipe(mapTo(v))));
