import {filterEmpty, filterNil, filterNull} from 'lycoris-common';
import {of} from 'rxjs';
import {isEmpty} from 'rxjs/operators';

describe('filterNull', () => {
    it('should filter null', async () => {
        expect(await of(null).pipe(filterNull(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter undefined', async () => {
        expect(await of(undefined).pipe(filterNull(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should not filter zero', async () => {
        expect(await of(0).pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter empty string', async () => {
        expect(await of('').pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter empty object', async () => {
        expect(await of({}).pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter empty array', async () => {
        expect(await of([]).pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non null number', async () => {
        expect(await of(1).pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non empty string', async () => {
        expect(await of('test').pipe(filterNull(), isEmpty()).toPromise()).toBeFalse();
    });
});

describe('filterNil', () => {
    it('should filter null', async () => {
        expect(await of(null).pipe(filterNil(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter undefined', async () => {
        expect(await of(undefined).pipe(filterNil(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter zero', async () => {
        expect(await of(0).pipe(filterNil(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter empty string', async () => {
        expect(await of('').pipe(filterNil(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should not filter empty object', async () => {
        expect(await of({}).pipe(filterNil(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter empty array', async () => {
        expect(await of([]).pipe(filterNil(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non null number', async () => {
        expect(await of(1).pipe(filterNil(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non empty string', async () => {
        expect(await of('test').pipe(filterNil(), isEmpty()).toPromise()).toBeFalse();
    });
});

describe('filterEmpty', () => {
    it('should filter null', async () => {
        expect(await of(null).pipe(filterEmpty(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter undefined', async () => {
        expect(await of(undefined).pipe(filterEmpty(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter empty string', async () => {
        expect(await of('').pipe(filterEmpty(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter empty object', async () => {
        expect(await of({}).pipe(filterEmpty(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should filter empty array', async () => {
        expect(await of([]).pipe(filterEmpty(), isEmpty()).toPromise()).toBeTrue();
    });

    it('should not filter non empty string', async () => {
        expect(await of('test').pipe(filterEmpty(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non empty object', async () => {
        expect(await of({label: 'test'}).pipe(filterEmpty(), isEmpty()).toPromise()).toBeFalse();
    });

    it('should not filter non empty array', async () => {
        expect(await of(['test']).pipe(filterEmpty(), isEmpty()).toPromise()).toBeFalse();
    });
});
