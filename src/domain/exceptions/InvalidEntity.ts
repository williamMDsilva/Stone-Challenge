export class InvalidEntity extends Error {
    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, InvalidEntity.prototype);
    }
}