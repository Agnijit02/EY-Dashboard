import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middlewares/validation.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { createResourceSchema, updateResourceSchema } from '../schemas/resource.schema';
import * as controller from '../controllers/resource.controller';

const router = Router();

router.get('/', authenticate, asyncHandler(controller.getResources));
router.get('/:id', authenticate, asyncHandler(controller.getResource));
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(createResourceSchema),
  asyncHandler(controller.createResource),
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(updateResourceSchema),
  asyncHandler(controller.updateResource),
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  asyncHandler(controller.deleteResource),
);

export default router;
