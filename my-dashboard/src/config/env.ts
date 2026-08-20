const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== 'false'; // defaults to true in dev if unset

export const env = {
  apiBaseUrl: API_BASE_URL,
  useMockApi: USE_MOCK_API,
};
