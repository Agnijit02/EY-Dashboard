import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import Spinner from '../components/ui/Spinner';

function ProtectedRoute() {
	const { isAuthenticated, isLoading, checkAuth } = useAuth();
	const location = useLocation();
	const hasCheckedRef = useRef(false);

	useEffect(() => {
		if (!isAuthenticated && !hasCheckedRef.current) {
			hasCheckedRef.current = true;
			void checkAuth();
		}
	}, [isAuthenticated, checkAuth]);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#0F0F12]">
				<div className="flex flex-col items-center gap-3">
					<Spinner size="lg" className="text-[#FFE600]" />
					<p className="text-sm font-semibold text-slate-400">Verifying enterprise session...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return <Outlet />;
}

export default ProtectedRoute;