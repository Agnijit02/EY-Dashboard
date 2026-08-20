export type UserRole = 'ADMIN' | 'MANAGER' | 'VIEWER';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  lastLoginAt?: string;
}

export type User = AuthUser;

export interface LoginResponseData {
  user: AuthUser;
  accessToken: string;
}
