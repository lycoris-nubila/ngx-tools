import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isNil',
})
export class IsNilPipe implements PipeTransform {

  constructor() {
  }

  transform(value: unknown): boolean {
    return !value;
  }

}
