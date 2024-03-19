import { Router } from 'express';
import {
  createProductValidation,
  findAllProductsValidation,
  findByIdProductValidation,
  newOrderProductValidation,
  updateProductValidation,
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
router.post(
  '/:id/new-order',
  auth(),
  findByIdProductValidation(),
  newOrderProductValidation(),
  productController.newOrder,
);

// * Patch Methods
router.patch(
  '/:id',
  auth({ allowedRoles: [adminRole] }),
  findByIdProductValidation(),
  updateProductValidation(),
  productController.update,
);

// * Delete Methods
router.delete(
  '/:id',
  auth({ allowedRoles: [adminRole] }),
  findByIdProductValidation(),
  productController.remove,
);

export default router;
