import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { errorExamples, type ErrorExample } from '@/lib/lessonData';
import { supabase } from '@/lib/supabase';
import { Newspaper, AlertCircle, Pencil, BookOpen, CheckCircle2 } from 'lucide-react';

interface Stage5Props {
  onComplete: () => void;
  onBack: () => void;
}

interface ErrorData {
  identified_error: string;
  explanation: string;
  correction: string;
  completed: boolean;
}

export default function Stage5({ onComplete, onBack }: Stage5Props) {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<number, ErrorData>>({});
  const [showCorrection, setShowCorrection] = useState<Record<number, boolean>>({});

  const item: ErrorExample = errorExamples[current];
  const completedCount = Object.values(data).filter((d) => d.completed).length;
  const allDone = completedCount === errorExamples.length;

  useEffect(() => {
    supabase.from('error_investigations').select('*').then(({ data: rows }) => {
      if (rows) {
        const map: Record<number, ErrorData> = {};
        for (const row of rows) {
          map[row.item_index] = {
            identified_error: row.identified_error || '',
            explanation: row.explanation || '',
            correction: row.correction || '',
            completed: row.completed || false,
          };
        }
        setData(map);
      }
    });
  }, []);

  const saveItem = (idx: number, d: ErrorData) => {
    setData((prev) => ({ ...prev, [idx]: d }));
    const payload = {
      item_index: idx,
      headline: errorExamples[idx - 1].headline,
      identified_error: d.identified_error,
      explanation: d.explanation,
      correction: d.correction,
      completed: d.completed,
      updated_at: new Date().toISOString(),
    };
    supabase.from('error_investigations').select('id').eq('item_index', idx).maybeSingle().then(({ data: existing }) => {
      if (existing) {
        supabase.from('error_investigations').update(payload).eq('id', existing.id).then();
      } else {
        supabase.from('error_investigations').insert(payload).then();
      }
    });
  };

  const cd = data[item.index] || { identified_error: '', explanation: '', correction: '', completed: false };
  const canSubmit = cd.identified_error.trim().length > 5 && cd.explanation.trim().length > 5 && cd.correction.trim().length > 5;

  return (
    <StageShell
      title="The Five-Error Investigation"
      subtitle="Blinky has 5 AI-generated news examples. Find the errors!"
      duration="10 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={onComplete}
          nextLabel="Move to Fact-Check Claims"
        />
      }
    >
      <Blinky
        mood="detective"
        message="I generated five news stories using AI. But each one has a mistake — a false fact, an invented discovery, a wrong date, a misleading number, or a twisted conclusion. Can you find all five errors?"
      />

      {/* Progress tracker */}
      <div className="bg-white border-2 border-slate-100 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading text-sm font-bold text-slate-700">Tiwa's Five AI News Errors Investigation</h3>
          <span className="text-xs font-bold text-slate-500">{completedCount}/5</span>
        </div>
        <div className="flex gap-1.5">
          {errorExamples.map((ex) => (
            <button
              key={ex.index}
              onClick={() => setCurrent(ex.index - 1)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                current === ex.index - 1
                  ? 'bg-sky-100 border-2 border-sky-400'
                  : data[ex.index]?.completed
                  ? 'bg-emerald-50 border-2 border-emerald-200'
                  : 'bg-slate-50 border-2 border-slate-100'
              }`}
            >
              <span className="text-xl">{ex.emoji}</span>
              {data[ex.index]?.completed && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Current investigation */}
      <div className="bg-white border-2 border-sky-100 rounded-2xl overflow-hidden shadow-sm animate-pop-in" key={item.index}>
        {/* News article header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">AI-Generated News Example</span>
            <span className="text-xs text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded-full">{item.topic}</span>
          </div>
          <h3 className="font-heading text-base font-bold text-white leading-snug">{item.headline}</h3>
        </div>

        <div className="p-4">
          <p className="text-sm text-slate-600 leading-relaxed mb-4 italic">{item.bodyText}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-4">
            <p className="text-xs text-amber-800">
              <strong>Error type to find:</strong> {item.errorType}
            </p>
          </div>

          {/* Investigation form */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5" /> 1. The headline or claim: What did AI say?
              </label>
              <div className="bg-slate-50 border-2 border-slate-100 rounded-lg px-3 py-2 text-xs text-slate-600 italic">
                {item.headline}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> 2. The error: What is incorrect or misleading?
              </label>
              <textarea
                value={cd.identified_error}
                onChange={(e) => saveItem(item.index, { ...cd, identified_error: e.target.value })}
                placeholder="The thing that is wrong is..."
                rows={2}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5 text-violet-500" /> 3. My explanation: Why do I think it is an error?
              </label>
              <textarea
                value={cd.explanation}
                onChange={(e) => saveItem(item.index, { ...cd, explanation: e.target.value })}
                placeholder="I think this is wrong because..."
                rows={2}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-violet-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> 4. The correction or evidence: What did I discover?
              </label>
              <textarea
                value={cd.correction}
                onChange={(e) => saveItem(item.index, { ...cd, correction: e.target.value })}
                placeholder="The correct information is..."
                rows={2}
                className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Reveal correction */}
            <button
              onClick={() => setShowCorrection((prev) => ({ ...prev, [item.index]: !prev[item.index] }))}
              className="w-full text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1"
            >
              {showCorrection[item.index] ? 'Hide verified correction' : 'Reveal verified correction (check your answer)'}
            </button>

            {showCorrection[item.index] && (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3 animate-fade-up">
                <p className="text-xs font-bold text-emerald-700 mb-1">Verified Correction:</p>
                <p className="text-xs text-emerald-800 mb-1">{item.answerKey.correction}</p>
                <p className="text-xs text-emerald-600 italic">Source: {item.answerKey.source}</p>
                <p className="text-xs text-slate-400 mt-2 italic">
                  This is a constructed teaching example with a verified factual correction.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                if (canSubmit) {
                  saveItem(item.index, { ...cd, completed: true });
                  if (current < errorExamples.length - 1) setCurrent(current + 1);
                  setShowCorrection({});
                }
              }}
              disabled={!canSubmit}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 transition-all disabled:opacity-40 shadow-md shadow-emerald-100"
            >
              {cd.completed ? '✓ Investigation Complete — Next Example' : current < errorExamples.length - 1 ? 'Save & Investigate Next →' : 'Complete Final Investigation'}
            </button>
          </div>
        </div>
      </div>

      {allDone && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 animate-fade-up">
          <Blinky
            mood="happy"
            message="You found all five AI errors! Your investigation record has been saved as 'Tiwa's Five AI News Errors Investigation.' Now let's put your fact-checking skills to the test!"
          />
        </div>
      )}
    </StageShell>
  );
}
