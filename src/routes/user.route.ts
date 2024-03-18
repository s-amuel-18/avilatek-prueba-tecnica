import { NextFunction, Request, Response, Router } from 'express';
import userController from '../controllers/user.controller';
const router = Router();
// ** Controllers
// import { UserController } from 'src/controllers/user.controller';

router.get('/seeder', userController.userSeeder);

export default router;
