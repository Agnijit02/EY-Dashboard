import { Router } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import clientRoutes from './client.routes';
import resourceRoutes from './resource.routes';
import riskRoutes from './risk.routes';
import reportRoutes from './report.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/clients', clientRoutes);
router.use('/resources', resourceRoutes);
router.use('/risks', riskRoutes);
router.use('/reports', reportRoutes);

export default router;
