import {OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HashMap} from '@datorama/akita';
import {AkitaNgFormsManager, ArrayControlFactory} from '@datorama/akita-ng-forms-manager';
import {Observable} from 'rxjs';
import {delay, distinctUntilChanged, retryWhen, switchMapTo} from 'rxjs/operators';

export class FormController<F> implements OnDestroy {

    constructor(private formsManager: AkitaNgFormsManager<F>,
                protected formName: keyof F,
                public form: FormGroup,
                config: {
                    debounceTime?: number; arrControlFactory?: ArrayControlFactory | HashMap<ArrayControlFactory>;
                } = {debounceTime: 1, arrControlFactory: null}) {
        formsManager.upsert(formName, form, config);
    }

    selectValue<T = any>(path?: string): Observable<T> {
        return this.formsManager.selectValue<T>(this.formName, path).pipe(
            retryWhen(errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))), distinctUntilChanged());
    }

    selectValid(path?: string): Observable<boolean> {
        return this.formsManager.selectValid(this.formName, path).pipe(
            retryWhen(errors => errors.pipe(switchMapTo(this.selectValue().pipe(delay(0))))), distinctUntilChanged());
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
