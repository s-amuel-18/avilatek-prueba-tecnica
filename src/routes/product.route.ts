import { Router } from 'express';
import {
  createProductValidation,
  findAllProductsValidation,
  findByIdProductValidation,
} from '../validations/product.validation';
import { productController } from '../controllers/product.controller';
import { auth } from '../middleware/auth.middleware';
import { adminRole, clientRole } from '../models/role.model';

const router = Router();

// * Get Methods
router.get('/', auth(), findAllProductsValidation(), productController.findAll);
router.get('/:id', auth(), findByIdProductValidation(), productController.findById);

// * Post Methods
router.post('/', auth({ allowedRoles: [adminRole] }), createProductValidation(), productController.create);

// * Patch Methods

// * Delete Methods
router.delete(
  '/:id',
  auth({ allowedRoles: [adminRole] }),
  findByIdProductValidation(),
  productController.remove,
);

export default router;
