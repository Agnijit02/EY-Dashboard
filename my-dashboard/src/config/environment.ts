export const environment = {
  appName: 'my-dashboard',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
} as const;