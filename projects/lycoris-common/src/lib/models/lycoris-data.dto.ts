export interface LycorisDataDto<T> {
    fresh: boolean;
    error?: Error;
    data?: T;
}
