import { useState } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { classificationItems } from '@/lib/lessonData';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface Stage2Props {
  onComplete: () => void;
  onBack: () => void;
}

type SortType = 'verified' | 'misleading' | 'invented';

const typeLabels: Record<SortType, { label: string; emoji: string; color: string }> = {
  verified: { label: 'Verified News', emoji: '✅', color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
  misleading: { label: 'Misleading Headline', emoji: '⚠️', color: 'bg-amber-50 border-amber-300 text-amber-800' },
  invented: { label: 'Invented Story', emoji: '❌', color: 'bg-rose-50 border-rose-300 text-rose-800' },
};

export default function Stage2({ onComplete, onBack }: Stage2Props) {
  const [sorts, setSorts] = useState<Record<string, SortType | ''>>({});
  const [checked, setChecked] = useState(false);

  const allSorted = classificationItems.every((item) => sorts[item.id]);
  const correctCount = classificationItems.filter((item) => sorts[item.id] === item.correctType).length;

  const setSort = (id: string, type: SortType) => {
    setSorts((prev) => ({ ...prev, [id]: type }));
    setChecked(false);
  };

  return (
    <StageShell
      title="What Is Fake News and Misinformation?"
      subtitle="Let's learn how to tell real news from false information"
      duration="7 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={onComplete}
          nextLabel="Learn to Spot Suspicious Headlines"
        />
      }
    >
      <Blinky
        mood="happy"
        message="Let's learn three important words: News, Misinformation, and Disinformation. They sound similar but they mean different things!"
      />

      {/* Definitions */}
      <div className="space-y-3">
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📰</span>
            <h3 className="font-heading text-sm font-bold text-sky-900">News</h3>
          </div>
          <p className="text-sm text-sky-800 leading-relaxed">
            Information about events shared with the public. <strong>Reliable news</strong> comes from sources
            that check their facts and tell you where their information came from.
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">⚠️</span>
            <h3 className="font-heading text-sm font-bold text-amber-900">Misinformation</h3>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">
            False or misleading information that is shared as if it were true — whether on purpose or by accident.
            An AI <strong>hallucination</strong> can become misinformation when its false claims get shared around.
          </p>
        </div>

        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎭</span>
            <h3 className="font-heading text-sm font-bold text-rose-900">Disinformation</h3>
          </div>
          <p className="text-sm text-rose-800 leading-relaxed">
            False information <strong>deliberately</strong> created or shared to trick people. The key difference:
            disinformation is on purpose, misinformation might not be.
          </p>
        </div>
      </div>

      {/* Visual comparison */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <h4 className="font-heading text-xs font-bold text-emerald-700 mb-1">Verified Report</h4>
          <p className="text-xs text-slate-600">Names its sources. Multiple outlets confirm it. You can check it.</p>
        </div>
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <h4 className="font-heading text-xs font-bold text-amber-700 mb-1">Misleading Headline</h4>
          <p className="text-xs text-slate-600">Has some truth but twists it. Exaggerates or leaves out key facts.</p>
        </div>
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">❌</div>
          <h4 className="font-heading text-xs font-bold text-rose-700 mb-1">Invented Story</h4>
          <p className="text-xs text-slate-600">Completely made up. No real evidence at all.</p>
        </div>
      </div>

      {/* Interactive classification */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5">
        <h3 className="font-heading text-base font-semibold text-slate-800 mb-1">
          Sorting Activity: Real or Fake?
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Read each headline and its source info. Sort it into the right category.
        </p>

        <div className="space-y-4">
          {classificationItems.map((item) => {
            const sorted = sorts[item.id];
            const isCorrect = checked && sorted === item.correctType;
            const isWrong = checked && sorted && sorted !== item.correctType;

            return (
              <div key={item.id} className={`rounded-xl border-2 p-4 transition-all ${
                isCorrect ? 'border-emerald-400 bg-emerald-50' : isWrong ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white'
              }`}>
                <p className="text-sm font-heading font-semibold text-slate-800 mb-1">{item.text}</p>
                <p className="text-xs text-slate-500 mb-3 italic">{item.source}</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(typeLabels) as SortType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSort(item.id, type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                        sorted === type
                          ? typeLabels[type].color + ' border-current'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {typeLabels[type].emoji} {typeLabels[type].label}
                    </button>
                  ))}
                </div>
                {isCorrect && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold animate-fade-up">
                    <CheckCircle2 className="w-4 h-4" /> Correct!
                  </div>
                )}
                {isWrong && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-700 font-semibold animate-fade-up">
                    <XCircle className="w-4 h-4" /> Not quite — try again or ask your tutor for a hint.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allSorted && (
          <button
            onClick={() => setChecked(true)}
            className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-colors"
          >
            Check My Answers
          </button>
        )}

        {checked && correctCount === classificationItems.length && (
          <div className="mt-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 flex items-start gap-2 animate-fade-up">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-800">
              Perfect! Remember: not every unusual headline is fake. Some surprising stories are real —
              that's why we need <strong>evidence</strong>, not just our feelings.
            </p>
          </div>
        )}
      </div>

      <Blinky
        mood="thinking"
        message="Here's the big idea: AI can write a headline that looks professional and sounds convincing — but still contains false information. Looking real is not the same as BEING real."
      />
    </StageShell>
  );
}
