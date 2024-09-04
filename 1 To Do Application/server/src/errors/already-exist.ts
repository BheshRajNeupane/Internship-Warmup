import { CustomError } from "./custom-error";

export class AlreadyExistError extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, AlreadyExistError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
