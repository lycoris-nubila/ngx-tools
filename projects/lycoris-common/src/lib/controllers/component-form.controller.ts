import {OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HashMap, Store} from '@datorama/akita';
import {
  AkitaAbstractControl,
  AkitaNgFormsManager,
  ArrayControlFactory,
} from '@datorama/akita-ng-forms-manager';
import {Observable} from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  retryWhen,
  switchMapTo,
} from 'rxjs/operators';
import {ComponentController} from './component.controller';

export class ComponentFormController<S, F> extends ComponentController<S> implements OnDestroy {

  constructor(
    protected store: Store<S>,
    private formsManager: AkitaNgFormsManager<F>,
    protected formName: keyof F,
    public form: FormGroup,
    config: {
      debounceTime?: number; arrControlFactory?: ArrayControlFactory | HashMap<ArrayControlFactory>;
    } = {debounceTime: 1, arrControlFactory: null}) {
    super(store);
    formsManager.upsert(formName, form, config);
  }

  selectValue<T = any>(path?: string): Observable<T> {
    return this.formsManager.selectValue<T>(this.formName, path).pipe(
      retryWhen(
        errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))),
      distinctUntilChanged());
  }

  selectValid(path?: string): Observable<boolean> {
    return this.formsManager.selectValid(this.formName, path).pipe(
      retryWhen(
        errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))),
      distinctUntilChanged());
  }

  selectErrors<T = any>(path?: string): Observable<T> {
    return this.formsManager.selectErrors(this.formName, path).pipe(
      retryWhen(
        errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))),
      distinctUntilChanged());
  }

  selectControl(path?: string): Observable<AkitaAbstractControl> {
    return this.formsManager.selectControl(this.formName, path).pipe(
      retryWhen(
        errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))),
      distinctUntilChanged());
  }

  upsert(form: FormGroup): void {
    this.formsManager.unsubscribe(this.formName);
    this.formsManager.upsert(this.formName, form, {debounceTime: 1});
    form.updateValueAndValidity();
    this.form = form;
  }

  ngOnDestroy(): void {
    this.formsManager.unsubscribe(this.formName);
    this.formsManager.remove(this.formName);
  }

}
