import { useState } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { workedExample } from '@/lib/lessonData';
import { Hand, Search, Brain, ArrowRight } from 'lucide-react';

interface Stage4Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Stage4({ onComplete, onBack }: Stage4Props) {
  const [showWorked, setShowWorked] = useState(false);

  return (
    <StageShell
      title="The Three-Step Fact-Check"
      subtitle="STOP → CHECK → THINK — your fact-checking superpower"
      duration="8 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={onComplete}
          nextLabel="Start the Five-Error Investigation"
        />
      }
    >
      <Blinky
        mood="excited"
        message="This is the MOST important part of the whole lesson! I'm going to teach you a 3-step routine you can use anytime you see a claim online. It's called STOP, CHECK, THINK."
      />

      {/* Three steps */}
      <div className="space-y-4">
        {/* STOP */}
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Hand className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-rose-800">1. STOP</h3>
              <p className="text-xs text-rose-600 font-semibold">Don't immediately believe the answer</p>
            </div>
          </div>
          <p className="text-sm text-rose-800 leading-relaxed mb-2">
            Pause before accepting or sharing a claim.
          </p>
          <div className="bg-white rounded-xl p-3 space-y-1.5">
            {[
              'Does this headline sound surprising?',
              'Am I believing it just because it looks professional?',
              'Should I pause before sharing it?',
            ].map((q) => (
              <p key={q} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="text-rose-400 font-bold">?</span> {q}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
        </div>

        {/* CHECK */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-sky-800">2. CHECK</h3>
              <p className="text-xs text-sky-600 font-semibold">Look for reliable information from another source</p>
            </div>
          </div>
          <p className="text-sm text-sky-800 leading-relaxed mb-2">
            Find another trustworthy source to investigate the claim.
          </p>
          <div className="bg-white rounded-xl p-3 space-y-1.5">
            {[
              'Search for the claim or important keywords',
              'Look for trustworthy websites or recognised sources',
              'Compare information from more than one source',
              'Check whether the source actually supports the claim',
            ].map((q) => (
              <p key={q} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="text-sky-400 font-bold">→</span> {q}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
        </div>

        {/* THINK */}
        <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-5 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-violet-800">3. THINK</h3>
              <p className="text-xs text-violet-600 font-semibold">Does the answer actually make sense?</p>
            </div>
          </div>
          <p className="text-sm text-violet-800 leading-relaxed mb-2">
            Consider whether the evidence really supports the claim.
          </p>
          <div className="bg-white rounded-xl p-3 space-y-1.5">
            {[
              'Does the evidence support the headline?',
              'Are the names, dates, places, and details consistent?',
              'Is important information missing?',
              'Does the conclusion follow from the evidence?',
            ].map((q) => (
              <p key={q} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="text-violet-400 font-bold">?</span> {q}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Worked example */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5">
        <h3 className="font-heading text-base font-semibold text-slate-800 mb-1">
          Let's see it in action — a worked example
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          I'll walk through all three steps with a real claim so you can see how it works.
        </p>

        {!showWorked ? (
          <button
            onClick={() => setShowWorked(true)}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-colors"
          >
            Show the Worked Example
          </button>
        ) : (
          <div className="space-y-3 animate-fade-up">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-400 mb-1">THE CLAIM</p>
              <p className="text-sm font-heading font-semibold text-slate-800">{workedExample.claim}</p>
            </div>

            <div className="bg-rose-50 rounded-xl border-2 border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-1">🛑 STOP</p>
              <p className="text-xs text-rose-800">{workedExample.stop.explanation}</p>
            </div>

            <div className="bg-sky-50 rounded-xl border-2 border-sky-200 p-3">
              <p className="text-xs font-bold text-sky-700 mb-1">🔍 CHECK</p>
              <p className="text-xs text-sky-800 font-semibold">{workedExample.check.source}</p>
              <p className="text-xs text-sky-800 mt-1">{workedExample.check.whatItSays}</p>
            </div>

            <div className="bg-violet-50 rounded-xl border-2 border-violet-200 p-3">
              <p className="text-xs font-bold text-violet-700 mb-1">🧠 THINK</p>
              <p className="text-xs text-violet-800">{workedExample.think.reasoning}</p>
            </div>

            <div className="bg-emerald-50 rounded-xl border-2 border-emerald-300 p-3 flex items-center gap-3">
              <span className="text-lg font-bold text-emerald-700 bg-white px-3 py-1 rounded-lg">
                Verdict: {workedExample.verdict}
              </span>
              <p className="text-xs text-emerald-700">{workedExample.verdictNote}</p>
            </div>
          </div>
        )}
      </div>

      <Blinky
        mood="happy"
        message="Now you've seen how STOP-CHECK-THINK works. Next, you'll use it yourself to investigate five AI news examples. You can always come back to this page if you need a reminder!"
      />
    </StageShell>
  );
}
