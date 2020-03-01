export class Exception extends Error {
  errorCode: number;
  constructor(message, errorCode?) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
  }
}
