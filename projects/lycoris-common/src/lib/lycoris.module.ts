import {NgModule} from '@angular/core';
import {NgLetDirective} from './directives/ng-let.directive';
import {HtmlPipe} from './pipes/html.pipe';
import {MomentPipe} from './pipes/moment.pipe';
import {UrlPipe} from './pipes/url.pipe';
import {ResourceUrlPipe} from './pipes/resource-url.pipe';
import {ToFormatPipe} from './pipes/to-format.pipe';
import {ToLocaleStringPipe} from './pipes/to-locale-string.pipe';

const elements = [
  NgLetDirective,
  HtmlPipe,
  MomentPipe,
  UrlPipe,
  ResourceUrlPipe,
  ToFormatPipe,
  ToLocaleStringPipe];

@NgModule({
  declarations: elements, exports: elements,
})
export class LycorisModule {
}
