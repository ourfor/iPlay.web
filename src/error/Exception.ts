export enum ExceptionType {
    UNKNOWN,
    NO_USER,
    SERVER_ERROR
}

export class Exception extends Error {
    public code: ExceptionType = ExceptionType.UNKNOWN;

    constructor(message: string, code: ExceptionType) {
        super(message);
        this.code = code;
    }
}