import { HttpStatus } from "./http-status.util";

export class BadRequestException {
  status = HttpStatus.BAD_REQUEST;
  message?: string;

  constructor(message?: string) {
    this.message = message || "BAD REQUEST";
  }
}

export class NotFoundException {
  status = HttpStatus.NOT_FOUND;
  message?: string;

  constructor(message?: string) {
    this.message = message || "NOT FOUND";
  }
}

export class UnauthorizedException {
  status = HttpStatus.UNAUTHORIZED;
  message?: string;

  constructor(message?: string) {
    this.message = message || "UNAUTHORIZED";
  }
}
