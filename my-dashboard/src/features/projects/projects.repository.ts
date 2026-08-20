import { env } from '../../config/env';
import * as projectsApi from './projects.api';
import * as projectsMockService from './projects.service';
import { projectsMockData } from './projects.mock';
import type { CreateProjectPayload, Project, ProjectFilters, ProjectsResponse, UpdateProjectPayload } from './projects.types';

export interface GetProjectsParams {
  filters: ProjectFilters;
  page: number;
  pageSize: number;
}

export function getProjects(params: GetProjectsParams): Promise<ProjectsResponse> {
  if (env.useMockApi) {
    return projectsMockService.getProjects(params);
  }
  return projectsApi.getProjects(params);
}

export function getProject(id: string): Promise<Project> {
  if (env.useMockApi) {
    const mock = projectsMockData.find((p) => p.id === id);
    if (!mock) {
      return Promise.reject(new Error('Project not found'));
    }
    return Promise.resolve(mock);
  }
  return projectsApi.getProject(id);
}

export function createProject(payload: CreateProjectPayload): Promise<Project> {
  if (env.useMockApi) {
    return projectsMockService.createProject(payload);
  }
  return projectsApi.createProject(payload);
}

export function updateProject(payload: UpdateProjectPayload): Promise<Project> {
  if (env.useMockApi) {
    return projectsMockService.updateProject(payload);
  }
  return projectsApi.updateProject(payload);
}

export function deleteProject(id: string): Promise<void> {
  if (env.useMockApi) {
    return projectsMockService.deleteProject(id);
  }
  return projectsApi.deleteProject(id);
}
