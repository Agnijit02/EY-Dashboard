import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

function PageHeader({ eyebrow, title, description, actions }: Props) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b border-slate-200/60 pb-6 lg:flex-row lg:items-end">
      <div>
        {eyebrow ? (
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#737373]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFE600] shadow-[0_0_6px_rgba(255,230,0,0.4)]" />
            {eyebrow}
          </p>
        ) : null}

        <h1 className="text-[28px] font-bold tracking-[-0.04em] text-[#1A1A1A] sm:text-[32px]">{title}</h1>

        {description ? <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-[#737373]">{description}</p> : null}
      </div>

      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export default PageHeader;
