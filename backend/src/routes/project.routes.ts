import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middlewares/validation.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';
import * as controller from '../controllers/project.controller';

const router = Router();

router.get('/', authenticate, asyncHandler(controller.getProjects));
router.get('/:id', authenticate, asyncHandler(controller.getProject));
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(createProjectSchema),
  asyncHandler(controller.createProject),
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(updateProjectSchema),
  asyncHandler(controller.updateProject),
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  asyncHandler(controller.deleteProject),
);

export default router;
