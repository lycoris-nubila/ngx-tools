import {Injector} from '@angular/core';

export class Locator {
    public static injector: Injector = null;

    public static inject<T>(token: any): T {
        return Locator.injector.get(token);
    }
}
