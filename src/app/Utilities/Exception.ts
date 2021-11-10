export class Exception extends Error {
  errorCode: number;
  errorText: string;
  constructor(message: string, errorCode: number = 500, errorText?: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
    this.errorText = errorText || '';
  }
}
