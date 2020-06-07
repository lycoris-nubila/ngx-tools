import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LycorisMessageDto} from '../models/lycoris-message.dto';

@Injectable({providedIn: 'root'})
export class LycorisMessagingService {

    private _message$ = new Subject<LycorisMessageDto>();

    public publishMessage(message: LycorisMessageDto): void {
        this._message$.next(message);
    }

    public observeMessage(): Observable<LycorisMessageDto> {
        return this._message$;
    }
}
