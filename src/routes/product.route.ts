import { Router } from 'express';
import {
  createProductValidation,
  findAllProductsValidation,
  findProductByIdValidation,
  findOrderByIdValidation,
  newOrderProductValidation,
  updateProductValidation,
  findAllOrdersValidation,
  changeOrderStatusValidation,
} from '../validations/product.validation';
import { productController } from '../controllers/product.controller';
import { auth } from '../middleware/auth.middleware';
import { adminRole, clientRole } from '../models/role.model';

const router = Router();

// * Get Methods
router.get('/', auth(), findAllProductsValidation(), productController.findAll);
router.get('/orders', auth(), findAllOrdersValidation(), productController.findAllOrders);
router.get('/:id', auth(), findProductByIdValidation(), productController.findById);
router.get('/order/:orderId', auth(), findOrderByIdValidation(), productController.findOrderById);

// * Post Methods
router.post('/', auth({ allowedRoles: [adminRole] }), createProductValidation(), productController.create);
router.post(
  '/:id/new-order',
  auth(),
  findProductByIdValidation(),
  newOrderProductValidation(),
  productController.newOrder,
);

// * Patch Methods
router.patch(
  '/order/:orderId',
  auth({ allowedRoles: [adminRole] }),
  findOrderByIdValidation(),
  changeOrderStatusValidation(),
  productController.changeOrderStatus,
);
router.patch(
  '/:id',
  auth({ allowedRoles: [adminRole] }),
  findProductByIdValidation(),
  updateProductValidation(),
  productController.update,
);

// * Delete Methods
router.delete(
  '/:id',
  auth({ allowedRoles: [adminRole] }),
  findProductByIdValidation(),
  productController.remove,
);

export default router;
