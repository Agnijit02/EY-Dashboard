export type DateRange = '7d' | '30d' | '90d' | 'ytd';

export type Region = 'all' | 'india' | 'europe' | 'americas' | 'apac';

export type Department = 'all' | 'technology' | 'consulting' | 'operations' | 'strategy';

export type ProjectStatus = 'all' | 'active' | 'completed' | 'at-risk' | 'delayed';

export interface DashboardFilters {
  dateRange: DateRange;
  region: Region;
  department: Department;
  projectStatus: ProjectStatus;
}

export const DATE_RANGE_OPTIONS: Array<{ label: string; value: DateRange }> = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Year to Date', value: 'ytd' },
];

export const REGION_OPTIONS: Array<{ label: string; value: Region }> = [
  { label: 'All Regions', value: 'all' },
  { label: 'India', value: 'india' },
  { label: 'Europe', value: 'europe' },
  { label: 'Americas', value: 'americas' },
  { label: 'APAC', value: 'apac' },
];

export const DEPARTMENT_OPTIONS: Array<{ label: string; value: Department }> = [
  { label: 'All Departments', value: 'all' },
  { label: 'Technology', value: 'technology' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'Operations', value: 'operations' },
  { label: 'Strategy', value: 'strategy' },
];

export const PROJECT_STATUS_OPTIONS: Array<{ label: string; value: ProjectStatus }> = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'At Risk', value: 'at-risk' },
  { label: 'Delayed', value: 'delayed' },
];