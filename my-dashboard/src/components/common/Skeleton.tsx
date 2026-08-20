import { cn } from '../../utils/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-200/80', className)} {...props} />;
}

export default Skeleton;