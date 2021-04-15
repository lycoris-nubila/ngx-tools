import {compareEntities, compareEntity, IEntity} from 'lycoris-common';
import {Observable, of} from 'rxjs';

enum TestEnum {
  VALUE1 = 'VALUE1', VALUE2 = 'VALUE2'
}

class TestEntity implements IEntity {

  private _id: string;
  private _num: number;
  private _enumeration: TestEnum;
  private _creationTimestamp: number;
  private _updateTimestamp: number;
  private _deepObject: any;
  private _observable$: Observable<any>;

  constructor(
    id: string, num: number, enumeration: TestEnum, deepObject?: any,
    observable$?: Observable<any>) {
    this._id = id;
    this._num = num;
    this._enumeration = enumeration;
    this._creationTimestamp = null;
    this._updateTimestamp = null;
    this._deepObject = deepObject;
    this._observable$ = observable$;
  }

  public get id(): string {
    return this._id;
  }

  public get creationTimestamp(): number {
    return this._creationTimestamp;
  }

  public get updateTimestamp(): number {
    return this._updateTimestamp;
  }
}

describe('compareEntities', () => {
  it('should have same objects equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1);
    const b = new TestEntity('12', 1, TestEnum.VALUE1);

    expect(compareEntities([a], [b])).toBeTrue();
  });

  it('should have different objects with different deep object equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1});
    const b = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 2});

    expect(compareEntities([a], [b])).toBeFalse();
  });

  it('should have same objects with different observables equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1}, of(null));
    const b = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1}, of(1));

    expect(compareEntities([a], [b])).toBeTrue();
  });

  it('should have different objects not equals', async () => {
    let a = new TestEntity('12', 1, TestEnum.VALUE1);
    let b = new TestEntity('13', 1, TestEnum.VALUE1);

    expect(compareEntities([a], [b])).toBeFalse();

    a = new TestEntity('12', 1, TestEnum.VALUE1);
    b = new TestEntity('12', 2, TestEnum.VALUE1);

    expect(compareEntities([a], [b])).toBeFalse();

    a = new TestEntity('12', 1, TestEnum.VALUE1);
    b = new TestEntity('12', 1, TestEnum.VALUE2);

    expect(compareEntities([a], [b])).toBeFalse();
  });
});

describe('compareEntity', () => {
  it('should have same objects equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1);
    const b = new TestEntity('12', 1, TestEnum.VALUE1);

    expect(compareEntity(a, b)).toBeTrue();
  });

  it('should have different objects with different deep object equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1});
    const b = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 2});

    expect(compareEntity(a, b)).toBeFalse();
  });

  it('should have same objects with different observables equals', async () => {
    const a = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1}, of(null));
    const b = new TestEntity('12', 1, TestEnum.VALUE1, {deep: 1}, of(1));

    expect(compareEntity(a, b)).toBeTrue();
  });

  it('should have different objects not equals', async () => {
    let a = new TestEntity('12', 1, TestEnum.VALUE1);
    let b = new TestEntity('13', 1, TestEnum.VALUE1);

    expect(compareEntity(a, b)).toBeFalse();

    a = new TestEntity('12', 1, TestEnum.VALUE1);
    b = new TestEntity('12', 2, TestEnum.VALUE1);

    expect(compareEntity(a, b)).toBeFalse();

    a = new TestEntity('12', 1, TestEnum.VALUE1);
    b = new TestEntity('12', 1, TestEnum.VALUE2);

    expect(compareEntity(a, b)).toBeFalse();
  });
});

