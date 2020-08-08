import {NgModule} from '@angular/core';
import {NgLetDirective} from './directives/ng-let.directive';
import {HtmlPipe} from './pipes/html.pipe';
import {MomentPipe} from './pipes/moment.pipe';

@NgModule({declarations: [NgLetDirective, HtmlPipe, MomentPipe], exports: [NgLetDirective, HtmlPipe, MomentPipe]})
export class LycorisModule {
}
