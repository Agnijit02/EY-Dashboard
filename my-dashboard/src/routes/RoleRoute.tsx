import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../features/auth/auth.types';
import { useAuth } from '../hooks/useAuth';

interface RoleRouteProps {
	allowedRoles: UserRole[];
}

function RoleRoute({ allowedRoles }: RoleRouteProps) {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	const hasPermission = allowedRoles.includes(user.role);

	if (!hasPermission) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <Outlet />;
}

export default RoleRoute;
