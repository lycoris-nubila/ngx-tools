export interface ILycorisEntity {
    readonly id: string;
    readonly updateTimestamp: number;
    readonly creationTimestamp: number;
}

export class LycorisEntity implements ILycorisEntity {

    private _id: string;
    private _updateTimestamp: number;
    private _creationTimestamp: number;

    constructor(id: string, creationTimestamp?: number, updateTimestamp?: number) {
        this._id                = id;
        this._updateTimestamp   = updateTimestamp;
        this._creationTimestamp = creationTimestamp;
    }

    public get id(): string {
        return this._id;
    }

    public get updateTimestamp(): number {
        return this._updateTimestamp;
    }

    public get creationTimestamp(): number {
        return this._creationTimestamp;
    }

    protected markUpdated(): void {
        this._updateTimestamp = Date.now();
    }
}
