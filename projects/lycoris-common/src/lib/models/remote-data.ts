export interface RemoteData<T> {
    fresh: boolean;
    error?: Error;
    data?: T;
}

export type LycorisDataDto<T> = RemoteData<T>;
