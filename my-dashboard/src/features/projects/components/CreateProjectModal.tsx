import { X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import type { Project } from '../projects.types';
import ProjectForm from './ProjectForm';
import type { ProjectFormValues } from '../projects.schema';

interface CreateProjectModalProps {
	open: boolean;
	project?: Project | null;
	isSubmitting?: boolean;
	onSubmit: (values: ProjectFormValues) => void;
	onClose: () => void;
}

function CreateProjectModal({ open, project, isSubmitting, onSubmit, onClose }: CreateProjectModalProps) {
	const { canManage } = useAuth();

	if (!open || !canManage) {
		return null;
	}

	const isEditMode = Boolean(project);

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
			{/* Overlay */}
			<button
				type="button"
				aria-label="Close modal"
				onClick={onClose}
				className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
			/>

			{/* Modal */}
			<div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
					<div>
						<h2 className="text-lg font-semibold text-slate-900">
							{isEditMode ? 'Edit Project' : 'Create New Project'}
						</h2>
						<p className="mt-1 text-xs text-slate-500">
							{isEditMode
								? 'Update project information and delivery details.'
								: 'Add a new project to your enterprise portfolio.'}
						</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						disabled={isSubmitting}
						className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Form */}
				<div className="overflow-y-auto px-6 py-6">
					<ProjectForm project={project} isSubmitting={isSubmitting} onSubmit={onSubmit} onCancel={onClose} />
				</div>
			</div>
		</div>
	);
}

export default CreateProjectModal;