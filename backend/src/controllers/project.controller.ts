import type { Request, Response } from 'express';
import * as projectService from '../services/project.service';
import { createAuditLog } from '../services/audit.service';

export async function getProjects(req: Request, res: Response) {
  const result = await projectService.getProjects(req.query as any);
  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
}

export async function getProject(req: Request, res: Response) {
  const project = await projectService.getProject(req.params.id as string);
  res.json({
    success: true,
    data: project,
  });
}

export async function createProject(req: Request, res: Response) {
  const project = await projectService.createProject(req.body);

  void createAuditLog({
    userId: req.user?.id,
    action: 'CREATE_PROJECT',
    entity: 'PROJECT',
    entityId: project.id,
    metadata: { name: project.name, code: project.code },
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.status(201).json({
    success: true,
    data: project,
  });
}

export async function updateProject(req: Request, res: Response) {
  const project = await projectService.updateProject(req.params.id as string, req.body);

  void createAuditLog({
    userId: req.user?.id,
    action: 'UPDATE_PROJECT',
    entity: 'PROJECT',
    entityId: project.id,
    metadata: { name: project.name },
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.json({
    success: true,
    data: project,
  });
}

export async function deleteProject(req: Request, res: Response) {
  await projectService.deleteProject(req.params.id as string);

  void createAuditLog({
    userId: req.user?.id,
    action: 'DELETE_PROJECT',
    entity: 'PROJECT',
    entityId: req.params.id as string,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.status(204).send();
}
