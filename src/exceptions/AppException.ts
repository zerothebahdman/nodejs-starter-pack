export default class AppException extends Error {
  public statusCode: number;
  public status: string;

  constructor(message: string, statusCode: number, stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Error' : 'Fail';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
