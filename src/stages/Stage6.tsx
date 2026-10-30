import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { factCheckClaims, type FactCheckClaim } from '@/lib/lessonData';
import { supabase } from '@/lib/supabase';
import { Hand, Search, Brain, Gavel, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface Stage6Props {
  onComplete: () => void;
  onBack: () => void;
}

interface FCData {
  stop_note: string;
  check_source: string;
  check_note: string;
  think_note: string;
  verdict: string;
  verdict_explanation: string;
  completed: boolean;
}

const VERDICTS = ['TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'] as const;
const verdictColors: Record<string, string> = {
  TRUE: 'bg-emerald-500 text-white border-emerald-500',
  FALSE: 'bg-rose-500 text-white border-rose-500',
  MISLEADING: 'bg-amber-500 text-white border-amber-500',
  UNVERIFIED: 'bg-slate-500 text-white border-slate-500',
};

export default function Stage6({ onComplete, onBack }: Stage6Props) {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<number, FCData>>({});
  const [showEvidence, setShowEvidence] = useState<Record<number, boolean>>({});

  const claim: FactCheckClaim = factCheckClaims[current];
  const completedCount = Object.values(data).filter((d) => d.completed).length;
  const allDone = completedCount === factCheckClaims.length;

  useEffect(() => {
    supabase.from('factcheck_reports').select('*').then(({ data: rows }) => {
      if (rows) {
        const map: Record<number, FCData> = {};
        for (const row of rows) {
          map[row.claim_index] = {
            stop_note: row.stop_note || '',
            check_source: row.check_source || '',
            check_note: row.check_note || '',
            think_note: row.think_note || '',
            verdict: row.verdict || '',
            verdict_explanation: row.verdict_explanation || '',
            completed: row.completed || false,
          };
        }
        setData(map);
      }
    });
  }, []);

  const saveItem = (idx: number, d: FCData) => {
    setData((prev) => ({ ...prev, [idx]: d }));
    const payload = {
      claim_index: idx,
      claim: factCheckClaims[idx - 1].claim,
      stop_note: d.stop_note,
      check_source: d.check_source,
      check_note: d.check_note,
      think_note: d.think_note,
      verdict: d.verdict,
      verdict_explanation: d.verdict_explanation,
      completed: d.completed,
      updated_at: new Date().toISOString(),
    };
    supabase.from('factcheck_reports').select('id').eq('claim_index', idx).maybeSingle().then(({ data: existing }) => {
      if (existing) {
        supabase.from('factcheck_reports').update(payload).eq('id', existing.id).then();
      } else {
        supabase.from('factcheck_reports').insert(payload).then();
      }
    });
  };

  const cd = data[claim.index] || { stop_note: '', check_source: '', check_note: '', think_note: '', verdict: '', verdict_explanation: '', completed: false };
  const canSubmit =
    cd.stop_note.trim().length > 5 &&
    cd.check_source.trim().length > 2 &&
    cd.check_note.trim().length > 5 &&
    cd.think_note.trim().length > 5 &&
    cd.verdict !== '' &&
    cd.verdict_explanation.trim().length > 5;

  return (
    <StageShell
      title="Apply the Fact-Check: Three AI Claims"
      subtitle="Use STOP → CHECK → THINK to investigate and write your verdict"
      duration="7 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={onComplete}
          nextLabel="Recap & Reflect"
        />
      }
    >
      <Blinky
        mood="detective"
        message="Here are three AI-generated claims. For each one, you'll complete STOP, CHECK, and THINK, then write a verdict. Remember: TRUE, FALSE, MISLEADING, or UNVERIFIED. This gets saved as your Three-Step Fact-Check Report!"
      />

      {/* STOP-CHECK-THINK quick reference */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-3 flex items-center gap-4 text-xs">
        <span className="font-bold text-rose-600 flex items-center gap-1"><Hand className="w-3.5 h-3.5" />STOP</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-sky-600 flex items-center gap-1"><Search className="w-3.5 h-3.5" />CHECK</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-violet-600 flex items-center gap-1"><Brain className="w-3.5 h-3.5" />THINK</span>
      </div>

      {/* Progress tracker */}
      <div className="flex gap-2 justify-center">
        {factCheckClaims.map((c) => (
          <button
            key={c.index}
            onClick={() => setCurrent(c.index - 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              current === c.index - 1
                ? 'bg-sky-500 text-white scale-105'
                : data[c.index]?.completed
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {data[c.index]?.completed && <CheckCircle2 className="w-3 h-3" />}
            {c.emoji} Claim {c.index}
          </button>
        ))}
      </div>

      {/* Current claim */}
      <div className="bg-white border-2 border-sky-100 rounded-2xl p-5 shadow-sm animate-pop-in" key={claim.index}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-4xl">{claim.emoji}</span>
          <div>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{claim.topic}</span>
            <p className="text-base font-heading font-semibold text-slate-800 mt-2 leading-snug">{claim.claim}</p>
            <p className="text-sm text-slate-500 mt-1">{claim.context}</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* STOP */}
          <div className="border-2 border-rose-200 rounded-xl p-3 bg-rose-50/30">
            <label className="text-xs font-bold text-rose-700 mb-1.5 flex items-center gap-1.5">
              <Hand className="w-3.5 h-3.5" /> STOP — Why should you pause before believing this claim?
            </label>
            <textarea
              value={cd.stop_note}
              onChange={(e) => saveItem(claim.index, { ...cd, stop_note: e.target.value })}
              placeholder="I should pause because..."
              rows={2}
              className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* CHECK */}
          <div className="border-2 border-sky-200 rounded-xl p-3 bg-sky-50/30">
            <label className="text-xs font-bold text-sky-700 mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> CHECK — What reliable source did you find? What does it say?
            </label>
            <input
              value={cd.check_source}
              onChange={(e) => saveItem(claim.index, { ...cd, check_source: e.target.value })}
              placeholder="Source (e.g. NASA, National Geographic...)"
              className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors mb-2"
            />
            <textarea
              value={cd.check_note}
              onChange={(e) => saveItem(claim.index, { ...cd, check_note: e.target.value })}
              placeholder="The source says..."
              rows={2}
              className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* THINK */}
          <div className="border-2 border-violet-200 rounded-xl p-3 bg-violet-50/30">
            <label className="text-xs font-bold text-violet-700 mb-1.5 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" /> THINK — Does the evidence support the claim?
            </label>
            <textarea
              value={cd.think_note}
              onChange={(e) => saveItem(claim.index, { ...cd, think_note: e.target.value })}
              placeholder="The evidence shows..."
              rows={2}
              className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-violet-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* VERDICT */}
          <div className="border-2 border-slate-300 rounded-xl p-3 bg-slate-50">
            <label className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5" /> Your Verdict
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {VERDICTS.map((v) => (
                <button
                  key={v}
                  onClick={() => saveItem(claim.index, { ...cd, verdict: v })}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border-2 transition-all ${
                    cd.verdict === v
                      ? verdictColors[v]
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <textarea
              value={cd.verdict_explanation}
              onChange={(e) => saveItem(claim.index, { ...cd, verdict_explanation: e.target.value })}
              placeholder="I chose this verdict because..."
              rows={2}
              className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Reveal evidence */}
          <button
            onClick={() => setShowEvidence((prev) => ({ ...prev, [claim.index]: !prev[claim.index] }))}
            className="w-full text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1"
          >
            {showEvidence[claim.index] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showEvidence[claim.index] ? 'Hide supporting evidence' : 'Reveal supporting evidence (for tutor to check)'}
          </button>

          {showEvidence[claim.index] && (
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-3 animate-fade-up">
              <p className="text-xs font-bold text-slate-600 mb-1">Verified Evidence & Correct Verdict:</p>
              <p className="text-xs text-slate-700 mb-1">
                <strong>Correct verdict: {claim.answerKey.correctVerdict}</strong>
              </p>
              <p className="text-xs text-slate-600 mb-1">{claim.answerKey.explanation}</p>
              <p className="text-xs text-slate-500 italic">Source: {claim.answerKey.source}</p>
            </div>
          )}

          <button
            onClick={() => {
              if (canSubmit) {
                saveItem(claim.index, { ...cd, completed: true });
                if (current < factCheckClaims.length - 1) setCurrent(current + 1);
                setShowEvidence({});
              }
            }}
            disabled={!canSubmit}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all disabled:opacity-40 shadow-md shadow-sky-100"
          >
            {cd.completed ? '✓ Report Complete — Next Claim' : current < factCheckClaims.length - 1 ? 'Save & Next Claim →' : 'Complete Final Report'}
          </button>
        </div>
      </div>

      {allDone && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 animate-fade-up">
          <Blinky
            mood="happy"
            message="All three fact-check reports are complete! Your work has been saved as 'Tiwa's Three-Step Fact-Check Report.' One last step — let's recap what you've learned!"
          />
        </div>
      )}
    </StageShell>
  );
}
