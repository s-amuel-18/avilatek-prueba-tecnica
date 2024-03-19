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

router.get('/', auth(), findAllProductsValidation(), productController.findAll);
router.get('/:id', auth(), findByIdProductValidation(), productController.findById);
router.post('/', auth({ allowedRoles: [adminRole] }), createProductValidation(), productController.create);

export default router;
