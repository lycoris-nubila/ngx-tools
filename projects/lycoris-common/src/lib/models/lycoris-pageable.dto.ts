export interface LycorisPageableDto<T> {
    totalElements?: number;
    nextPageToken?: string;
    fresh: boolean;
    error?: Error;
    data?: T[];
}
