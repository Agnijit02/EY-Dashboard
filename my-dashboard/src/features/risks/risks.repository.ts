import { env } from '../../config/env';
import * as risksApi from './risks.api';
import * as risksMockService from './risks.service';
import { risksMockData } from './risks.mock';
import type { CreateRiskPayload, Risk, RiskFilters, RisksResponse } from './risks.types';

export interface GetRisksParams {
  filters: RiskFilters;
  page: number;
  pageSize: number;
}

export function getRisks(params: GetRisksParams): Promise<RisksResponse> {
  if (env.useMockApi) {
    return risksMockService.getRisks(params);
  }
  return risksApi.getRisks(params);
}

export function getRisk(id: string): Promise<Risk> {
  if (env.useMockApi) {
    const mock = risksMockData.find((r) => r.id === id);
    if (!mock) {
      return Promise.reject(new Error('Risk not found'));
    }
    return Promise.resolve(mock);
  }
  return risksApi.getRisk(id);
}

export function createRisk(payload: CreateRiskPayload): Promise<Risk> {
  if (env.useMockApi) {
    return risksMockService.createRisk(payload);
  }
  return risksApi.createRisk(payload);
}
