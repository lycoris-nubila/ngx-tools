import {Injectable} from '@angular/core';
import {Message} from '../models/message';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessagingService {

    private _message$ = new Subject<Message>();

    public publishMessage(message: Message): void {
        this._message$.next(message);
    }

    public observeMessage(): Observable<Message> {
        return this._message$;
    }
}
