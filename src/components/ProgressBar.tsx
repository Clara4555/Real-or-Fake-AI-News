import { Check } from 'lucide-react';
import type { StageStatus } from '@/lib/useLessonProgress';

interface ProgressBarProps {
  stages: { id: string; label: string }[];
  progress: Record<string, StageStatus>;
  currentStage: string;
  onNavigate: (stageId: string) => void;
}

export default function ProgressBar({ stages, progress, currentStage, onNavigate }: ProgressBarProps) {
  const completedCount = stages.filter((s) => progress[s.id] === 'complete').length;
  const pct = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="bg-white border-b-2 border-sky-100 sticky top-0 z-40 print:hidden">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-heading text-lg text-slate-800 font-semibold hidden sm:block">
            AI Explorers Junior
          </h2>
          <div className="flex items-center gap-2 flex-1 sm:flex-initial sm:justify-end">
            <div className="flex-1 sm:w-40 h-2.5 bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 tabular-nums">{pct}%</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 -mb-1">
          {stages.map((stage, idx) => {
            const isActive = currentStage === stage.id;
            const isComplete = status === 'complete';

            return (
              <button
                onClick={() => onNavigate(stage.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md shadow-blue-200'
                    : isComplete
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isComplete ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="w-3 h-3 flex items-center justify-center">{idx + 1}</span>
                )}
                <span className="hidden md:inline">{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
