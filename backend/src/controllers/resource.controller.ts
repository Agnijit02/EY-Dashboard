import type { Request, Response } from 'express';
import * as resourceService from '../services/resource.service';

export async function getResources(req: Request, res: Response) {
  const result = await resourceService.getResources(req.query as any);
  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
}

export async function getResource(req: Request, res: Response) {
  const resource = await resourceService.getResource(req.params.id as string);
  res.json({
    success: true,
    data: resource,
  });
}

export async function createResource(req: Request, res: Response) {
  const resource = await resourceService.createResource(req.body);
  res.status(201).json({
    success: true,
    data: resource,
  });
}

export async function updateResource(req: Request, res: Response) {
  const resource = await resourceService.updateResource(req.params.id as string, req.body);
  res.json({
    success: true,
    data: resource,
  });
}

export async function deleteResource(req: Request, res: Response) {
  await resourceService.deleteResource(req.params.id as string);
  res.status(204).send();
}
