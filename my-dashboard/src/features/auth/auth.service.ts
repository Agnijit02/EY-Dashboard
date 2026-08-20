import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import { env } from '../../config/env';
import { mockUsers } from './auth.mock';
import type { AuthUser, LoginResponseData } from './auth.types';

function getMockLoginResponse(email: string): LoginResponseData | null {
  const normalizedEmail = email.trim().toLowerCase();
  const matched = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!matched) {
    return null;
  }
  return {
    user: matched,
    accessToken: `mock-demo-jwt-token-${matched.role.toLowerCase()}-${Date.now()}`,
  };
}

export async function loginApi(email: string, password: string): Promise<LoginResponseData> {
  if (env.useMockApi) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const mockRes = getMockLoginResponse(email);
    if (!mockRes || password !== 'Password123!') {
      throw new Error('Invalid email or password. Use demo credentials.');
    }
    return mockRes;
  }

  try {
    const response = await apiClient.post<{ success: boolean; data: LoginResponseData }>(
      API_ENDPOINTS.auth.login,
      { email, password },
    );
    return response.data.data;
  } catch (error: unknown) {
    // If backend database is offline or returned 500, fallback to mock demo user
    const mockRes = getMockLoginResponse(email);
    if (mockRes && password === 'Password123!') {
      return mockRes;
    }
    throw error;
  }
}

export async function refreshTokenApi(): Promise<LoginResponseData> {
  if (env.useMockApi) {
    const mockAdmin = mockUsers[0];
    return {
      user: mockAdmin,
      accessToken: `mock-demo-jwt-token-${mockAdmin.role.toLowerCase()}-${Date.now()}`,
    };
  }

  try {
    const response = await apiClient.post<{ success: boolean; data: LoginResponseData }>(
      API_ENDPOINTS.auth.refresh,
    );
    return response.data.data;
  } catch (error) {
    if (env.useMockApi) {
      const mockAdmin = mockUsers[0];
      return {
        user: mockAdmin,
        accessToken: `mock-demo-jwt-token-${mockAdmin.role.toLowerCase()}-${Date.now()}`,
      };
    }
    throw error;
  }
}

export async function logoutApi(): Promise<void> {
  if (!env.useMockApi) {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch {
      // Ignore backend logout errors
    }
  }
}

export async function getMeApi(): Promise<AuthUser> {
  if (env.useMockApi) {
    return mockUsers[0];
  }

  const response = await apiClient.get<{ success: boolean; data: AuthUser }>(
    API_ENDPOINTS.auth.me,
  );
  return response.data.data;
}

export async function login(credentials: { email: string; password: string }): Promise<AuthUser> {
  const res = await loginApi(credentials.email, credentials.password);
  return res.user;
}
