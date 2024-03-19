import { body, param } from 'express-validator';
import { validate } from '../utils/validate.util';
import { pagination } from './utils.validation';

export const createProductValidation = () => [
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto es requerido.')
    .bail()
    .isString()
    .withMessage('El nombre del producto debe ser de tipo texto.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Longitud maxima de 50 caracteres.'),
  body('price')
    .notEmpty()
    .withMessage('El precio es requerido.')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser un numero valido.')
    .bail(),
  body('stock')
    .notEmpty()
    .bail()
    .withMessage('El stock es requerido.')
    .isInt()
    .bail()
    .withMessage('El stock debe ser un numero valido')
    .isLength({ min: 1 }),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser de tipo texto.')
    .bail()
    .notEmpty()
    .bail()
    .isLength({ max: 500 })
    .withMessage('Longitud maxima de 500 caracteres.')
    .bail(),
  validate,
];

export const findAllProductsValidation = () => [...pagination()];

export const findByIdProductValidation = () => [param('id').notEmpty().isInt().toInt(), validate];

export const updateProductValidation = () => [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('El nombre del producto es requerido.')
    .bail()
    .isString()
    .withMessage('El nombre del producto debe ser de tipo texto.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Longitud maxima de 50 caracteres.'),
  body('price')
    .optional()
    .notEmpty()
    .withMessage('El precio es requerido.')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser un numero valido.')
    .bail(),
  body('stock')
    .optional()
    .notEmpty()
    .bail()
    .withMessage('El stock es requerido.')
    .isInt()
    .bail()
    .withMessage('El stock debe ser un numero valido')
    .isLength({ min: 1 }),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser de tipo texto.')
    .bail()
    .notEmpty()
    .bail()
    .isLength({ max: 500 })
    .withMessage('Longitud maxima de 500 caracteres.')
    .bail(),
  validate,
];
