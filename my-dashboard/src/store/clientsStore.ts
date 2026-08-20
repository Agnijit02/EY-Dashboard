import { create } from 'zustand';
import type { ClientFilters, ClientStatus, Industry } from '../features/clients/clients.types';

interface ClientsState {
	filters: ClientFilters;
	page: number;
	pageSize: number;
	selectedClientId: string | null;
	setSearch: (search: string) => void;
	setIndustry: (industry: Industry | 'all') => void;
	setStatus: (status: ClientStatus | 'all') => void;
	setPage: (page: number) => void;
	setSelectedClient: (id: string | null) => void;
	resetFilters: () => void;
}

const initialFilters: ClientFilters = {
	search: '',
	industry: 'all',
	status: 'all',
};

export const useClientsStore = create<ClientsState>((set) => ({
	filters: initialFilters,
	page: 1,
	pageSize: 8,
	selectedClientId: null,

	setSearch: (search) =>
		set((state) => ({
			filters: { ...state.filters, search },
			page: 1,
		})),

	setIndustry: (industry) =>
		set((state) => ({
			filters: { ...state.filters, industry },
			page: 1,
		})),

	setStatus: (status) =>
		set((state) => ({
			filters: { ...state.filters, status },
			page: 1,
		})),

	setPage: (page) => set({ page }),

	setSelectedClient: (selectedClientId) => set({ selectedClientId }),

	resetFilters: () =>
		set({
			filters: initialFilters,
			page: 1,
		}),
}));
