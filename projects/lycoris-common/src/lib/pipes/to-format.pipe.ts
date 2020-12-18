import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, DateTimeFormatOptions} from 'luxon';

@Pipe({
  name: 'toFormat',
})
export class ToFormatPipe implements PipeTransform {

  constructor() {
  }

  transform(
      value: DateTime, format: string, options: DateTimeFormatOptions): string {
    return value?.toFormat(format, options);
  }

}
