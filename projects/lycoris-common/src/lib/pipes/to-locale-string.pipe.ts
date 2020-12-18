import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, DateTimeFormatOptions, LocaleOptions} from 'luxon';

@Pipe({
  name: 'toLocaleString',
})
export class ToLocaleStringPipe implements PipeTransform {

  constructor() {
  }

  transform(
      value: DateTime, format: LocaleOptions & DateTimeFormatOptions): string {
    return value?.toLocaleString(format);
  }

}
