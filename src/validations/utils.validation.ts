import { body, query } from 'express-validator';

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

export const pagination = () => [
  query('limit').optional().isInt({ min: 1 }).toInt(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('search').optional().isString().notEmpty(),
];
