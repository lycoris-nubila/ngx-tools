import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nullIfEmpty',
})
export class NullIfEmptyPipe implements PipeTransform {

  constructor() {
  }

  transform<T>(value: T[]): T[] {
    return value?.length > 0 ? value : null;
  }

}
