import { env } from '../../config/env';
import * as clientsApi from './clients.api';
import * as clientsMockService from './clients.service';
import { clientsMockData } from './clients.mock';
import type { Client, ClientFilters, ClientsResponse } from './clients.types';

export interface GetClientsParams {
  filters: ClientFilters;
  page: number;
  pageSize: number;
}

export function getClients(params: GetClientsParams): Promise<ClientsResponse> {
  if (env.useMockApi) {
    return clientsMockService.getClients(params);
  }
  return clientsApi.getClients(params);
}

export function getClient(id: string): Promise<Client> {
  if (env.useMockApi) {
    const mock = clientsMockData.find((c) => c.id === id);
    if (!mock) {
      return Promise.reject(new Error('Client not found'));
    }
    return Promise.resolve(mock);
  }
  return clientsApi.getClient(id);
}
