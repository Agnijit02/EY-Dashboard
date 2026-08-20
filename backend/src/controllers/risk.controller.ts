import type { Request, Response } from 'express';
import * as riskService from '../services/risk.service';

export async function getRisks(req: Request, res: Response) {
  const result = await riskService.getRisks(req.query as any);
  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
}

export async function getRisk(req: Request, res: Response) {
  const risk = await riskService.getRisk(req.params.id as string);
  res.json({
    success: true,
    data: risk,
  });
}

export async function createRisk(req: Request, res: Response) {
  const risk = await riskService.createRisk(req.body);
  res.status(201).json({
    success: true,
    data: risk,
  });
}

export async function updateRisk(req: Request, res: Response) {
  const risk = await riskService.updateRisk(req.params.id as string, req.body);
  res.json({
    success: true,
    data: risk,
  });
}

export async function deleteRisk(req: Request, res: Response) {
  await riskService.deleteRisk(req.params.id as string);
  res.status(204).send();
}
