import { create } from 'zustand';
import type {
	AvailabilityStatus,
	ResourceDepartment,
	ResourceFilters,
	ResourceRole,
} from '../features/resources/resources.types';

interface ResourcesState {
	filters: ResourceFilters;
	page: number;
	pageSize: number;
	selectedResourceId: string | null;
	setSearch: (search: string) => void;
	setDepartment: (department: ResourceDepartment | 'all') => void;
	setRole: (role: ResourceRole | 'all') => void;
	setAvailability: (availability: AvailabilityStatus | 'all') => void;
	setPage: (page: number) => void;
	setSelectedResource: (id: string | null) => void;
	resetFilters: () => void;
}

const initialFilters: ResourceFilters = {
	search: '',
	department: 'all',
	role: 'all',
	availability: 'all',
};

export const useResourcesStore = create<ResourcesState>((set) => ({
	filters: initialFilters,
	page: 1,
	pageSize: 8,
	selectedResourceId: null,

	setSearch: (search) =>
		set((state) => ({
			filters: { ...state.filters, search },
			page: 1,
		})),

	setDepartment: (department) =>
		set((state) => ({
			filters: { ...state.filters, department },
			page: 1,
		})),

	setRole: (role) =>
		set((state) => ({
			filters: { ...state.filters, role },
			page: 1,
		})),

	setAvailability: (availability) =>
		set((state) => ({
			filters: { ...state.filters, availability },
			page: 1,
		})),

	setPage: (page) => set({ page }),
	setSelectedResource: (selectedResourceId) => set({ selectedResourceId }),
	resetFilters: () =>
		set({
			filters: initialFilters,
			page: 1,
		}),
}));
