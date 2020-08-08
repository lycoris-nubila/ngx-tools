import {Pipe, PipeTransform} from '@angular/core';
import {Moment} from 'moment';

@Pipe({
    name: 'moment',
})
export class MomentPipe implements PipeTransform {

    constructor() {
    }

    transform(value: Moment, format: string): string {
        return value?.format(format);
    }

}
