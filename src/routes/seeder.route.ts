import { Router } from 'express';

import { seederController } from '../controllers/seeder.controller';

const router = Router();

// ** Routes
router.post('/execute', seederController.execute);

export default router;
