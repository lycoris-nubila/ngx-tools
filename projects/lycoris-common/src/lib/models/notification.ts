import {NotificationAction} from './notification-action';
import {NotificationDomain} from './notification-domain';

export interface Notification {
    readonly entityId: string;
    readonly domain: NotificationDomain;
    readonly action: NotificationAction;
}

export type LycorisPushMessageDto = Notification;
