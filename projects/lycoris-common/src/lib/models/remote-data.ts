export interface RemoteData<T> {
    fresh: boolean;
    error?: Error;
    data?: T;
}
