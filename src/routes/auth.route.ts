import { Router } from 'express';
import { AuthController, authController } from '../controllers/auth.controller';
import { loginValidation, signUpValidation } from '../validations/auth.validation';

const router = Router();

// ** Routes
router.post('/login', loginValidation(), authController.login);
router.post('/sign-up', signUpValidation(), authController.signUp);

export default router;
