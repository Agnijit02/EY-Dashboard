import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../features/auth/auth.types';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
	login: (user: User) => void;
	logout: () => void;
	initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isInitialized: false,
			login: (user) =>
				set({
					user,
					isAuthenticated: true,
					isInitialized: true,
				}),
			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					isInitialized: true,
				}),
			initialize: () =>
				set({
					isInitialized: true,
				}),
		}),
		{
			name: 'enterprise-auth',
		},
	),
);