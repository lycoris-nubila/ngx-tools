export interface LycorisMessageDto {
    severity: 'success' | 'error' | 'info';
    params?: { [key: string]: any };
    summaryKey: string;
    detailKey: string;
}
