import {LycorisPushMessageAction} from './lycoris-push-message.action';
import {LycorisPushMessageDomain} from './lycoris-push-message.domain';

export interface LycorisPushMessageDto {
    readonly entityId: string;
    readonly domain: LycorisPushMessageDomain;
    readonly action: LycorisPushMessageAction;
}
