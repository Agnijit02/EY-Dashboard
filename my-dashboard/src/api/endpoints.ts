export const API_ENDPOINTS = {
  projects: '/projects',
  clients: '/clients',
  resources: '/resources',
  risks: '/risks',
  reports: '/reports/overview',
  dashboard: '/dashboard',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
} as const;
