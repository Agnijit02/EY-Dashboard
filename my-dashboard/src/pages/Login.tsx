import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login, isLoading } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');

		if (!email.trim()) {
			setError('Please enter your work email.');
			return;
		}

		if (!password) {
			setError('Please enter your password.');
			return;
		}

		try {
			await login(email, password);
			navigate(from, { replace: true });
		} catch (err: unknown) {
			const errorObj = err as { response?: { data?: { error?: { message?: string } } }; message?: string };
			setError(errorObj.response?.data?.error?.message || errorObj.message || 'Unable to sign in.');
		}
	}

	function handleQuickFill(roleEmail: string) {
		setEmail(roleEmail);
		setPassword('Password123!');
		setError('');
	}

	return (
		<main className="min-h-screen bg-[#0F0F12] text-slate-100 selection:bg-[#FFE600] selection:text-slate-950">
			<div className="grid min-h-screen lg:grid-cols-12">
				{/* Left Hero Branding Section */}
				<section className="relative hidden overflow-hidden border-r border-white/5 bg-gradient-to-br from-[#141417] via-[#1A1A1F] to-[#0A0A0C] p-12 lg:col-span-5 lg:flex lg:flex-col lg:justify-between xl:col-span-6">
					{/* Ambient Glow */}
					<div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#FFE600]/10 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-[#FFE600]/5 blur-3xl" />

					<div className="relative z-10">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFE600] font-black text-slate-950 shadow-lg shadow-[#FFE600]/20">
								EY
							</div>
							<div>
								<p className="text-base font-bold tracking-tight text-white">Enterprise Intelligence</p>
								<p className="text-xs font-semibold tracking-wider text-[#FFE600]">EXECUTIVE PLATFORM</p>
							</div>
						</div>
					</div>

					<div className="relative z-10 max-w-lg">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#FFE600]/20 bg-[#FFE600]/10 px-3 py-1 text-xs font-semibold text-[#FFE600]">
							<ShieldCheck className="h-3.5 w-3.5" />
							Enterprise Grade RBAC &amp; JWT Security
						</div>
						<h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
							Intelligence that turns complexity into clarity.
						</h1>
						<p className="mt-5 text-sm leading-relaxed text-slate-400">
							Unified portfolio oversight, proactive risk intelligence, resource capacity optimization, and executive performance analytics in one command center.
						</p>

						<div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
							<div>
								<p className="text-2xl font-bold text-white">99.9%</p>
								<p className="text-xs text-slate-400">Service SLA</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-[#FFE600]">128+</p>
								<p className="text-xs text-slate-400">Active Portfolios</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-white">₹480 Cr</p>
								<p className="text-xs text-slate-400">Managed Capital</p>
							</div>
						</div>
					</div>

					<div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
						<p>© 2026 EY Enterprise Platform</p>
						<p className="font-mono text-slate-400">v20.0 • Production Ready</p>
					</div>
				</section>

				{/* Right Form Section */}
				<section className="flex items-center justify-center p-6 sm:p-12 lg:col-span-7 xl:col-span-6">
					<div className="w-full max-w-md">
						{/* Mobile Header */}
						<div className="mb-8 flex items-center gap-3 lg:hidden">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE600] font-black text-slate-950">
								EY
							</div>
							<div>
								<p className="font-bold text-white">Enterprise Intelligence</p>
								<p className="text-xs text-[#FFE600]">PLATFORM LOGIN</p>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-3xl font-bold tracking-tight text-white">Sign In</h2>
							<p className="mt-2 text-sm text-slate-400">Access your enterprise workspace with your work credentials.</p>
						</div>

						{error ? (
							<div
								role="alert"
								className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
							>
								{error}
							</div>
						) : null}

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Email */}
							<div>
								<label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
									Work Email
								</label>
								<div className="relative">
									<Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										id="email"
										type="email"
										autoComplete="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="admin@enterprise.demo"
										className="h-12 w-full rounded-xl border border-white/10 bg-[#16161A] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600]"
									/>
								</div>
							</div>

							{/* Password */}
							<div>
								<label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
									Password
								</label>
								<div className="relative">
									<Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										id="password"
										type={showPassword ? 'text' : 'password'}
										autoComplete="current-password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="••••••••••••"
										className="h-12 w-full rounded-xl border border-white/10 bg-[#16161A] pl-10 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600]"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
										aria-label={showPassword ? 'Hide password' : 'Show password'}
									>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</button>
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isLoading}
								className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-[#FFE600] text-sm font-bold text-slate-950 transition hover:bg-[#FFE600]/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isLoading ? 'Signing in...' : 'Sign In to Workspace'}
							</button>
						</form>

						{/* Quick Demo Access Roles */}
						<div className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-4">
							<div className="flex items-center justify-between border-b border-white/5 pb-2.5">
								<p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demo Role Quick-Fill</p>
								<span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-[#FFE600]">1-Click</span>
							</div>

							<div className="mt-3 grid grid-cols-3 gap-2">
								<button
									type="button"
									onClick={() => handleQuickFill('admin@enterprise.demo')}
									className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-[#1B1B22] p-2.5 text-center transition hover:border-[#FFE600]/40 hover:bg-[#202028]"
								>
									<ShieldCheck className="h-4 w-4 text-[#FFE600]" />
									<span className="text-xs font-bold text-white">Admin</span>
									<span className="text-[10px] text-slate-400">Full Access</span>
								</button>

								<button
									type="button"
									onClick={() => handleQuickFill('manager@enterprise.demo')}
									className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-[#1B1B22] p-2.5 text-center transition hover:border-[#FFE600]/40 hover:bg-[#202028]"
								>
									<UserCheck className="h-4 w-4 text-emerald-400" />
									<span className="text-xs font-bold text-white">Manager</span>
									<span className="text-[10px] text-slate-400">Write / Edit</span>
								</button>

								<button
									type="button"
									onClick={() => handleQuickFill('viewer@enterprise.demo')}
									className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-[#1B1B22] p-2.5 text-center transition hover:border-[#FFE600]/40 hover:bg-[#202028]"
								>
									<Users className="h-4 w-4 text-sky-400" />
									<span className="text-xs font-bold text-white">Viewer</span>
									<span className="text-[10px] text-slate-400">Read Only</span>
								</button>
							</div>

							<p className="mt-2.5 text-center text-[11px] text-slate-500">
								Default password: <span className="font-mono text-slate-300">Password123!</span>
							</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

export default Login;