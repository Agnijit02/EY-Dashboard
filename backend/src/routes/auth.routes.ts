import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middlewares/validation.middleware';
import { loginSchema } from '../schemas/auth.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { loginRateLimit } from '../middlewares/rateLimit.middleware';
import * as controller from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginRateLimit, validateBody(loginSchema), asyncHandler(controller.login));
router.post('/refresh', asyncHandler(controller.refresh));
router.post('/logout', asyncHandler(controller.logout));
router.get('/me', authenticate, asyncHandler(controller.getMe));

export default router;
