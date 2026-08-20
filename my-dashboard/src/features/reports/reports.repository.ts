import { env } from '../../config/env';
import * as reportsApi from './reports.api';
import * as reportsMockService from './reports.service';
import type { ReportsData } from './reports.types';

export function getReports(): Promise<ReportsData> {
  if (env.useMockApi) {
    return reportsMockService.getReports();
  }
  return reportsApi.getReports();
}
