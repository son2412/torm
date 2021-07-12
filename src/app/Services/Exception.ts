export class Exception extends Error {
  errorCode: number;
  constructor(message: string, errorCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
  }
}
