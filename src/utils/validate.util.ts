import { NextFunction, Request, Response } from 'express';

const { validationResult } = require('express-validator');

interface ValidationError {
  msg: string;
  param: string;
  value: any;
  location: string;
  path: string;
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validated = validationResult(req).formatWith((error: ValidationError) => {
    return {
      msg: error.msg,
      field: error.path,
      value: error.value,
      location: error.location,
    };
  });

  if (!validated.isEmpty())
    return next({ status: 400, message: validated.errors[0].msg, errors: validated.array() });

  next();
};

module.exports = { validate };
