import { body } from 'express-validator';
import { validate } from '../utils/validate.util';
import { validateEmail, validatePassword } from './utils.validation';

export const loginValidation = () => [
  validateEmail(),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerída')
    .bail()
    .isString()
    .withMessage('La contraseña debe ser de tipo texto.')
    .bail(),
  validate,
];

export const signUpValidation = () => [
  validateEmail(),
  validatePassword(),
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .bail()
    .isString()
    .withMessage('El nombre debe ser de tipo texto')
    .isLength({ max: 50 })
    .withMessage('Longitud maxima 50'),
  validate,
];
