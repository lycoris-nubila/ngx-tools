import {OnDestroy} from '@angular/core';
import {Query, ReturnTypes, Store} from '@datorama/akita';
import {asyncScheduler, Observable} from 'rxjs';
import {observeOn} from 'rxjs/operators';

export class ComponentController<S = any> extends Query<S> implements OnDestroy {

    constructor(protected store: Store<S>) {
        super(store);
    }

    select<K extends keyof S>(key: K): Observable<S[K]>;
    select<R>(project: (store: S) => R): Observable<R>;
    select<K extends keyof S>(stateKeys: K[]): Observable<Pick<S, K>>;
    select<R extends [(state: S) => any] | Array<(state: S) => any>>(selectorFns: R): Observable<ReturnTypes<R>>;
    select(): Observable<S>;
    select<R>(project?: ((store: S) => R) | keyof S | (keyof S)[] | ((state: S) => any)[]): Observable<R | S | any[]> {
        // @ts-ignore
        return super.select(project).pipe(observeOn(asyncScheduler));
    }

    ngOnDestroy(): void {
    }
}
