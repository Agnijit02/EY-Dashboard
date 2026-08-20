import { env } from '../../config/env';
import * as resourcesApi from './resources.api';
import * as resourcesMockService from './resources.service';
import { resourcesMockData } from './resources.mock';
import type { CreateResourcePayload, Resource, ResourceFilters, ResourcesResponse } from './resources.types';

export interface GetResourcesParams {
  filters: ResourceFilters;
  page: number;
  pageSize: number;
}

export function getResources(params: GetResourcesParams): Promise<ResourcesResponse> {
  if (env.useMockApi) {
    return resourcesMockService.getResources(params);
  }
  return resourcesApi.getResources(params);
}

export function getResource(id: string): Promise<Resource> {
  if (env.useMockApi) {
    const mock = resourcesMockData.find((r) => r.id === id);
    if (!mock) {
      return Promise.reject(new Error('Resource not found'));
    }
    return Promise.resolve(mock);
  }
  return resourcesApi.getResource(id);
}

export function createResource(payload: CreateResourcePayload): Promise<Resource> {
  if (env.useMockApi) {
    return resourcesMockService.createResource(payload);
  }
  return resourcesApi.createResource(payload);
}
