import type { ReactNode } from 'react';

interface StageShellProps {
  title: string;
  subtitle?: string;
  duration?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function StageShell({ title, subtitle, duration, children, footer }: StageShellProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 animate-fade-up">
      <div className="mb-6">
        {duration && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full mb-2">
            ⏱ {duration}
          </span>
        )}
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      <div className="space-y-6">{children}</div>
      {footer && <div className="mt-8 pt-6 border-t-2 border-slate-100">{footer}</div>}
    </div>
  );
}

interface StageNavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  backLabel?: string;
}

export function StageNav({ onBack, onNext, nextLabel = 'Continue', nextDisabled, backLabel = 'Back' }: StageNavProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {onBack ? (
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          ← {backLabel}
        </button>
      ) : (
        <div />
      )}
      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 shadow-md shadow-blue-200 transition-all hover:scale-105 disabled:opacity-40 disabled:scale-100 disabled:shadow-none"
        >
          {nextLabel} →
        </button>
      )}
    </div>
  );
}
