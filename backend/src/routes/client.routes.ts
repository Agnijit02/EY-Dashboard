import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middlewares/validation.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema';
import * as controller from '../controllers/client.controller';

const router = Router();

router.get('/', authenticate, asyncHandler(controller.getClients));
router.get('/:id', authenticate, asyncHandler(controller.getClient));
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(createClientSchema),
  asyncHandler(controller.createClient),
);
router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MANAGER'),
  validateBody(updateClientSchema),
  asyncHandler(controller.updateClient),
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  asyncHandler(controller.deleteClient),
);

export default router;
