import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../components/ui/Button';
import ErrorState from '../components/ui/ErrorState';
import CreateProjectModal from '../features/projects/components/CreateProjectModal';
import ProjectDetailsDrawer from '../features/projects/components/ProjectDetailsDrawer';
import ProjectFilters from '../features/projects/components/ProjectFilters';
import ProjectPagination from '../features/projects/components/ProjectPagination';
import ProjectTable from '../features/projects/components/ProjectTable';
import ProjectsEmptyState from '../features/projects/components/ProjectsEmptyState';
import ProjectsSkeleton from '../features/projects/components/ProjectsSkeleton';
import type { ProjectFormValues } from '../features/projects/projects.schema';
import type { Project } from '../features/projects/projects.types';
import { useAuth } from '../hooks/useAuth';
import { useProjectMutations } from '../hooks/useProjectMutations';
import { useProjectsQuery } from '../hooks/useProjectsQuery';
import { useProjectsStore } from '../store/projectsStore';

function Projects() {
	const { canManage } = useAuth();
	const [searchParams] = useSearchParams();
	const filters = useProjectsStore((state) => state.filters);
	const page = useProjectsStore((state) => state.page);
	const pageSize = useProjectsStore((state) => state.pageSize);
	const selectedProjectId = useProjectsStore((state) => state.selectedProjectId);
	const setPage = useProjectsStore((state) => state.setPage);
	const setRegion = useProjectsStore((state) => state.setRegion);
	const setSelectedProject = useProjectsStore((state) => state.setSelectedProject);
	const resetFilters = useProjectsStore((state) => state.resetFilters);

	useEffect(() => {
		const regionParam = searchParams.get('region');
		if (regionParam && ['india', 'europe', 'americas', 'apac', 'all'].includes(regionParam.toLowerCase())) {
			setRegion(regionParam.toLowerCase() as any);
		}
	}, [searchParams, setRegion]);

	const query = useProjectsQuery({ filters, page, pageSize });

	// Form state
	const [formProject, setFormProject] = useState<Project | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const { createMutation, updateMutation, deleteMutation } = useProjectMutations();

	const handleCreateProject = (values: ProjectFormValues) => {
		createMutation.mutate(values, {
			onSuccess: (data) => {
				setIsFormOpen(false);
				setFormProject(null);
				toast.success(`Project "${data.name}" created successfully`);
			},
			onError: (error) => {
				toast.error(error instanceof Error ? error.message : 'Failed to create project');
			},
		});
	};

	const handleUpdateProject = (values: ProjectFormValues) => {
		if (!formProject) {
			return;
		}

		updateMutation.mutate(
			{
				...values,
				id: formProject.id,
			},
			{
				onSuccess: (data) => {
					setIsFormOpen(false);
					setFormProject(null);
					toast.success(`Project "${data.name}" updated successfully`);
				},
				onError: (error) => {
					toast.error(error instanceof Error ? error.message : 'Failed to update project');
				},
			},
		);
	};

	if (query.isLoading) {
		return <ProjectsSkeleton />;
	}

	if (query.isError) {
		return (
			<ErrorState
				title="Unable to load projects"
				description="We encountered an error retrieving the project catalog. Please try again."
				onRetry={() => query.refetch()}
			/>
		);
	}

	const data = query.data;
	const selectedProject = data?.projects.find((project) => project.id === selectedProjectId) ?? null;

	return (
		<div className="space-y-6">
			{/* Page header */}
			<section>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-900">Projects</h1>
						<p className="mt-1 text-sm text-slate-500">Manage projects, teams, budgets and delivery status.</p>
					</div>

					{canManage ? (
						<Button
							variant="accent"
							icon={<Plus className="h-4 w-4" />}
							onClick={() => {
								setFormProject(null);
								setIsFormOpen(true);
							}}
						>
							New Project
						</Button>
					) : (
						<span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
							Read-Only Access
						</span>
					)}
				</div>
			</section>

			{/* Filters */}
			<ProjectFilters />

			{/* Results header */}
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-slate-900">{data?.pagination.total ?? 0} Projects</p>
					{query.isFetching ? <p className="mt-1 text-xs text-slate-400">Updating...</p> : null}
				</div>
			</div>

			{/* Table */}
			{data && data.projects.length === 0 ? (
				<ProjectsEmptyState onReset={resetFilters} />
			) : data ? (
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<ProjectTable projects={data.projects} onProjectClick={(project) => setSelectedProject(project.id)} />

					<ProjectPagination
						page={data.pagination.page}
						totalPages={data.pagination.totalPages}
						total={data.pagination.total}
						pageSize={data.pagination.pageSize}
						onPageChange={setPage}
					/>
				</div>
			) : null}

			{/* Details Drawer */}
			<ProjectDetailsDrawer
				project={selectedProject}
				onClose={() => setSelectedProject(null)}
				onEdit={(project) => {
					setSelectedProject(null);
					setFormProject(project);
					setIsFormOpen(true);
				}}
				onDelete={(project) => {
					const confirmed = window.confirm(`Are you sure you want to delete "${project.name}"?`);

					if (!confirmed) {
						return;
					}

					deleteMutation.mutate(project.id, {
						onSuccess: () => {
							setSelectedProject(null);
							toast.success(`Project "${project.name}" deleted`);
						},
						onError: (error) => {
							toast.error(error instanceof Error ? error.message : 'Failed to delete project');
						},
					});
				}}
			/>

			{/* Create / Edit Modal */}
			<CreateProjectModal
				open={isFormOpen}
				project={formProject}
				isSubmitting={createMutation.isPending || updateMutation.isPending}
				onClose={() => {
					if (createMutation.isPending || updateMutation.isPending) {
						return;
					}

					setIsFormOpen(false);
					setFormProject(null);
				}}
				onSubmit={formProject ? handleUpdateProject : handleCreateProject}
			/>
		</div>
	);
}

export default Projects;