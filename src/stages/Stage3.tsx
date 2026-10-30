import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { inspectorItems, type InspectorItem } from '@/lib/lessonData';
import { supabase } from '@/lib/supabase';
import { Search, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface Stage3Props {
  onComplete: () => void;
  onBack: () => void;
}

interface SavedData {
  warningSigns: string;
  reasoning: string;
  completed: boolean;
}

export default function Stage3({ onComplete, onBack }: Stage3Props) {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<number, SavedData>>({});
  const [showHint, setShowHint] = useState(false);

  const item: InspectorItem = inspectorItems[current];
  const completedCount = Object.values(data).filter((d) => d.completed).length;
  const allDone = completedCount === inspectorItems.length;

  useEffect(() => {
    supabase.from('headline_inspector').select('*').then(({ data: rows }) => {
      if (rows) {
        const map: Record<number, SavedData> = {};
        for (const row of rows) {
          map[row.item_index] = {
            warningSigns: row.warning_signs || '',
            reasoning: row.reasoning || '',
            completed: row.completed || false,
          };
        }
        setData(map);
      }
    });
  }, []);

  const saveItem = (idx: number, d: SavedData) => {
    setData((prev) => ({ ...prev, [idx]: d }));
    const payload = {
      item_index: idx,
      headline: inspectorItems[idx - 1].headline,
      warning_signs: d.warningSigns,
      reasoning: d.reasoning,
      completed: d.completed,
      updated_at: new Date().toISOString(),
    };
    supabase.from('headline_inspector').select('id').eq('item_index', idx).maybeSingle().then(({ data: existing }) => {
      if (existing) {
        supabase.from('headline_inspector').update(payload).eq('id', existing.id).then();
      } else {
        supabase.from('headline_inspector').insert(payload).then();
      }
    });
  };

  const currentData = data[item.index] || { warningSigns: '', reasoning: '', completed: false };
  const canSubmit = currentData.warningSigns.trim().length > 5 && currentData.reasoning.trim().length > 5;

  return (
    <StageShell
      title="Headline Inspector"
      subtitle="Spot the warning signs in suspicious headlines"
      duration="6 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={onComplete}
          nextLabel="Learn STOP-CHECK-THINK"
        />
      }
    >
      <Blinky
        mood="detective"
        message="Time to put on your detective hat! I've collected some suspicious headlines. Your job: figure out what makes each one look fishy."
      />

      {/* Warning signs reference */}
      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
        <h3 className="font-heading text-sm font-bold text-violet-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Warning Signs to Look For
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            'Sensational or exaggerated language',
            'Claims that sound unbelievable',
            'Missing sources or evidence',
            'Wrong names, dates, places, or numbers',
            'Misleading images or captions',
            'Claims without enough information',
          ].map((sign) => (
            <div key={sign} className="flex items-center gap-2 text-xs text-violet-800">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0" />
              {sign}
            </div>
          ))}
        </div>
        <p className="text-xs text-violet-600 mt-2 italic">
          Remember: warning signs don't prove a story is false. They tell us when to investigate.
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 justify-center">
        {inspectorItems.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setCurrent(i)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              i === current
                ? 'bg-sky-500 text-white scale-110'
                : data[it.index]?.completed
                ? 'bg-emerald-400 text-white'
                : 'bg-slate-200 text-slate-500'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Current headline */}
      <div className="bg-white border-2 border-sky-100 rounded-2xl p-5 shadow-sm animate-pop-in" key={item.id}>
        <div className="flex items-start gap-3 mb-4">
          <div className="text-4xl">{item.emoji}</div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              {item.topic}
            </span>
            <p className="text-base font-heading font-semibold text-slate-800 mt-2 leading-snug">
              {item.headline}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <Search className="w-4 h-4 text-sky-500" /> What makes this headline suspicious?
            </label>
            <textarea
              value={currentData.warningSigns}
              onChange={(e) => saveItem(item.index, { ...currentData, warningSigns: e.target.value })}
              placeholder="I notice this headline has..."
              rows={2}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Explain your reasoning — why do you think so?
            </label>
            <textarea
              value={currentData.reasoning}
              onChange={(e) => saveItem(item.index, { ...currentData, reasoning: e.target.value })}
              placeholder="I think this because..."
              rows={2}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            onClick={() => {
              if (canSubmit) {
                saveItem(item.index, { ...currentData, completed: true });
                if (current < inspectorItems.length - 1) setCurrent(current + 1);
                setShowHint(false);
              }
            }}
            disabled={!canSubmit}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 transition-all disabled:opacity-40"
          >
            {currentData.completed ? '✓ Done — Next Headline' : current < inspectorItems.length - 1 ? 'Submit & Next Headline' : 'Submit Investigation'}
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1"
          >
            {showHint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>

          {showHint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 animate-fade-up">
              <p className="text-xs text-amber-800">
                <strong>Hint:</strong> {item.warningSign}
              </p>
            </div>
          )}
        </div>
      </div>

      {allDone && (
        <Blinky
          mood="happy"
          message={`Excellent detective work! You investigated all ${inspectorItems.length} headlines. Now let's learn the most important tool: STOP, CHECK, THINK!`}
        />
      )}
    </StageShell>
  );
}
