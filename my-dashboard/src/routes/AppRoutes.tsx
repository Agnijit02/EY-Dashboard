import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLoader from '../components/ui/PageLoader';
import { permissions } from '../features/auth/permissions';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Route-level code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Projects = lazy(() => import('../pages/Projects'));
const Clients = lazy(() => import('../pages/Clients'));
const Resources = lazy(() => import('../pages/Resources'));
const Risks = lazy(() => import('../pages/Risks'));
const Reports = lazy(() => import('../pages/Reports'));
const Login = lazy(() => import('../pages/Login'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const NotFound = lazy(() => import('../pages/NotFound'));

function AppRoutes() {
	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				{/* Public Routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />

				{/* Protected Workspace Routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<DashboardLayout />}>
						{/* Everyone (Admin, Manager, Viewer) */}
						<Route path="/dashboard" element={<Dashboard />} />

						{/* Admin + Manager */}
						<Route element={<RoleRoute allowedRoles={permissions.analytics} />}>
							<Route path="/analytics" element={<Analytics />} />
						</Route>

						<Route element={<RoleRoute allowedRoles={permissions.projects} />}>
							<Route path="/projects" element={<Projects />} />
						</Route>

						<Route element={<RoleRoute allowedRoles={permissions.resources} />}>
							<Route path="/resources" element={<Resources />} />
						</Route>

						<Route element={<RoleRoute allowedRoles={permissions.risks} />}>
							<Route path="/risks" element={<Risks />} />
						</Route>

						{/* Admin only */}
						<Route element={<RoleRoute allowedRoles={permissions.clients} />}>
							<Route path="/clients" element={<Clients />} />
						</Route>

						{/* Admin + Viewer */}
						<Route element={<RoleRoute allowedRoles={permissions.reports} />}>
							<Route path="/reports" element={<Reports />} />
						</Route>
					</Route>
				</Route>

				{/* Root Redirect */}
				<Route path="/" element={<Navigate to="/dashboard" replace />} />

				{/* 404 Catch All */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;