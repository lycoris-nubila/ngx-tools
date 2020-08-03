import {Observable} from 'rxjs';

type ObservableMethod = (...args: any[]) => Observable<any>;

const cache = new Map<string, Map<string, Observable<any>>>();

const buildKey = (parameters: Array<any>) => JSON.stringify(
    parameters.map(param => param !== undefined ? JSON.parse(JSON.stringify(param)) : param));

export function CacheObservable() {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<ObservableMethod>) {
        const method   = descriptor.value;
        const cacheKey = target.constructor.name + '#' + propertyKey;

        cache.set(cacheKey, new Map<string, Observable<any>>());

        const targetCache = cache.get(cacheKey);

        descriptor.value = function(...args: any[]) {
            const key = buildKey(args);

            if (!targetCache.has(key)) {
                targetCache.set(key, method.apply(this, args));
            }

            return targetCache.get(key);
        };

        return descriptor;
    };
}
