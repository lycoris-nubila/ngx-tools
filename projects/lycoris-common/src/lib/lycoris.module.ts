import {NgModule} from '@angular/core';
import {NgLetDirective} from './directives/ng-let.directive';
import {HtmlPipe} from './pipes/html.pipe';

@NgModule({declarations: [NgLetDirective, HtmlPipe], exports: [NgLetDirective, HtmlPipe]})
export class LycorisModule {
}
