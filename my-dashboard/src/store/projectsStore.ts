import { create } from 'zustand';
import type { ProjectFilters } from '../features/projects/projects.types';

interface ProjectsState {
  filters: ProjectFilters;
  page: number;
  pageSize: number;
  selectedProjectId: string | null;
  isCreateModalOpen: boolean;
  setSearch: (search: string) => void;
  setStatus: (status: ProjectFilters['status']) => void;
  setRegion: (region: ProjectFilters['region']) => void;
  setManager: (manager: string) => void;
  setPage: (page: number) => void;
  setSelectedProject: (id: string | null) => void;
  setCreateModalOpen: (open: boolean) => void;
  resetFilters: () => void;
}

const defaultFilters: ProjectFilters = {
  search: '',
  status: 'all',
  region: 'all',
  manager: 'all',
};

export const useProjectsStore = create<ProjectsState>((set) => ({
  filters: defaultFilters,
  page: 1,
  pageSize: 10,
  selectedProjectId: null,
  isCreateModalOpen: false,
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
      page: 1,
    })),
  setStatus: (status) =>
    set((state) => ({
      filters: { ...state.filters, status },
      page: 1,
    })),
  setRegion: (region) =>
    set((state) => ({
      filters: { ...state.filters, region },
      page: 1,
    })),
  setManager: (manager) =>
    set((state) => ({
      filters: { ...state.filters, manager },
      page: 1,
    })),
  setPage: (page) => set({ page }),
  setSelectedProject: (selectedProjectId) => set({ selectedProjectId }),
  setCreateModalOpen: (isCreateModalOpen) => set({ isCreateModalOpen }),
  resetFilters: () => set({ filters: defaultFilters, page: 1 }),
}));