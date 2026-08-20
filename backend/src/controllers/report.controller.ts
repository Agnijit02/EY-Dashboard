import type { Request, Response } from 'express';
import * as reportService from '../services/report.service';

export async function getOverview(_req: Request, res: Response) {
  const reports = await reportService.getOverview();
  res.json({
    success: true,
    data: reports,
  });
}
