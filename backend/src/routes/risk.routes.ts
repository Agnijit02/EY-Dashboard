import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middlewares/validation.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { createRiskSchema, updateRiskSchema } from '../schemas/risk.schema';
import * as controller from '../controllers/risk.controller';

const router = Router();

router.get('/', authenticate, asyncHandler(controller.getRisks));
router.get('/:id', authenticate, asyncHandler(controller.getRisk));
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(createRiskSchema),
  asyncHandler(controller.createRisk),
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(updateRiskSchema),
  asyncHandler(controller.updateRisk),
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  asyncHandler(controller.deleteRisk),
);

export default router;
