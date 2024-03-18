import { body } from 'express-validator';

export const validateEmail = (field?: string) =>
  body(field || 'email')
    .notEmpty()
    .withMessage('El email es requerído.')
    .bail()
    .isString()
    .withMessage('El email debe ser de tipo texto.')
    .bail()
    .isEmail()
    .withMessage('El email no es valido.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Longitud máxima 50');

export const validatePassword = (field?: string) =>
  body(field || 'password')
    .notEmpty()
    .withMessage('La contraseña es requerída')
    .bail()
    .isString()
    .withMessage('La contraseña debe ser de tipo texto.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Longitud máxima 50');
