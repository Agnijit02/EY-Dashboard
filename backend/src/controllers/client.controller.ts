import type { Request, Response } from 'express';
import * as clientService from '../services/client.service';

export async function getClients(req: Request, res: Response) {
  const result = await clientService.getClients(req.query as any);
  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
}

export async function getClient(req: Request, res: Response) {
  const client = await clientService.getClient(req.params.id as string);
  res.json({
    success: true,
    data: client,
  });
}

export async function createClient(req: Request, res: Response) {
  const client = await clientService.createClient(req.body);
  res.status(201).json({
    success: true,
    data: client,
  });
}

export async function updateClient(req: Request, res: Response) {
  const client = await clientService.updateClient(req.params.id as string, req.body);
  res.json({
    success: true,
    data: client,
  });
}

export async function deleteClient(req: Request, res: Response) {
  await clientService.deleteClient(req.params.id as string);
  res.status(204).send();
}
