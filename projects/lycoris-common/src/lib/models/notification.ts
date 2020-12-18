import {NotificationAction} from './notification-action';

export interface Notification<T> {
  readonly domain: T;
  readonly entityId: string;
  readonly action: NotificationAction;
}
