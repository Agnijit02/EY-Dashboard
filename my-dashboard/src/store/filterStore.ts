import { create } from 'zustand';
import type { DashboardFilters, DateRange, Department, ProjectStatus, Region } from '../types/filters';

interface FilterState extends DashboardFilters {
	setDateRange: (dateRange: DateRange) => void;
	setRegion: (region: Region) => void;
	setDepartment: (department: Department) => void;
	setProjectStatus: (projectStatus: ProjectStatus) => void;
	resetFilters: () => void;
}

const defaultFilters: DashboardFilters = {
	dateRange: '90d',
	region: 'all',
	department: 'all',
	projectStatus: 'all',
};

export const useFilterStore = create<FilterState>((set) => ({
	...defaultFilters,
	setDateRange: (dateRange) => set({ dateRange }),
	setRegion: (region) => set({ region }),
	setDepartment: (department) => set({ department }),
	setProjectStatus: (projectStatus) => set({ projectStatus }),
	resetFilters: () => set(defaultFilters),
}));