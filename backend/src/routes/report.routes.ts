import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authenticate } from '../middlewares/auth.middleware';
import * as controller from '../controllers/report.controller';

const router = Router();

router.get('/overview', authenticate, asyncHandler(controller.getOverview));

export default router;
