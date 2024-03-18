import { Router } from 'express';
import { createProductValidate } from '../validations/product.validation';
import { productController } from '../controllers/product.controller';
import { auth } from '../middleware/auth.middleware';
import { adminRole, clientRole } from '../models/role.model';

const router = Router();

router.post('/', auth({ allowedRoles: [adminRole] }), createProductValidate(), productController.create);

export default router;
