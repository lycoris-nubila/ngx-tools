import {Pipe, PipeTransform} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'url',
})
export class UrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}
