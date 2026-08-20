import { useCallback } from 'react';
import { useAuthStore } from '../auth.store';
import * as authService from '../auth.service';
import { toast } from 'sonner';

export function useAuth() {
  const { user, accessToken, isAuthenticated, isLoading, setAuth, clearAuth, setLoading } =
    useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const data = await authService.loginApi(email, password);
        setAuth(data.user, data.accessToken);
        toast.success(`Welcome back, ${data.user.name}`);
        return data.user;
      } catch (error: unknown) {
        const err = error as { response?: { data?: { error?: { message?: string } } }; message?: string };
        const msg = err.response?.data?.error?.message || err.message || 'Login failed';
        toast.error(msg);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logoutApi();
    } catch {
      // Ignore logout errors
    } finally {
      clearAuth();
      toast.info('You have been logged out');
    }
  }, [clearAuth]);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const data = await authService.refreshTokenApi();
      if (data?.user && data?.accessToken) {
        setAuth(data.user, data.accessToken);
      } else {
        clearAuth();
      }
    } catch {
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [setAuth, clearAuth, setLoading]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
    isAdmin: user?.role === 'ADMIN',
    isManager: user?.role === 'MANAGER',
    isViewer: user?.role === 'VIEWER',
    canManage: user?.role === 'ADMIN' || user?.role === 'MANAGER',
  };
}
