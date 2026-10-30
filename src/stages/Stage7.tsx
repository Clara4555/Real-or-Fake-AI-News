import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { recapQuestions } from '@/lib/lessonData';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface Stage7Props {
  onComplete: () => void;
  onBack: () => void;
  onGoTakeHome: () => void;
}

export default function Stage7({ onComplete, onBack, onGoTakeHome }: Stage7Props) {
  const [misinfo, setMisinfo] = useState('');
  const [suspicious, setSuspicious] = useState('');
  const [whyChecking, setWhyChecking] = useState('');
  const [sct, setSct] = useState('');
  const [verdict, setVerdict] = useState('');
  const [reflection, setReflection] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.from('recap_responses').select('*').maybeSingle().then(({ data }) => {
      if (data) {
        setMisinfo(data.misinformation_explanation || '');
        setSuspicious(data.suspicious_headline_id || '');
        setWhyChecking(data.why_checking_matters || '');
        setSct(data.stop_check_think || '');
        setVerdict(data.verdict_choice || '');
        setReflection(data.reflection_sentence || '');
      }
    });
  }, []);

  const save = () => {
    const payload = {
      misinformation_explanation: misinfo,
      suspicious_headline_id: suspicious,
      why_checking_matters: whyChecking,
      stop_check_think: sct,
      verdict_choice: verdict,
      reflection_sentence: reflection,
      updated_at: new Date().toISOString(),
    };
    supabase.from('recap_responses').select('id').maybeSingle().then(({ data }) => {
      if (data) {
        supabase.from('recap_responses').update(payload).eq('id', data.id).then();
      } else {
        supabase.from('recap_responses').insert(payload).then();
      }
    });
  };

  const suspiciousCorrect = suspicious === recapQuestions.suspiciousHeadlineOptions.find((o) => o.correct)?.id;
  const verdictCorrect = verdict === recapQuestions.verdictOptions.find((o) => o.correct)?.id;
  const canComplete = misinfo.trim().length > 5 && suspicious && whyChecking.trim().length > 5 && sct.trim().length > 3 && verdict && reflection.trim().length > 5;

  return (
    <StageShell
      title="Recap and Reflection"
      subtitle="Let's check what you've learned, Tiwa!"
      duration="3 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={() => {
            save();
            onComplete();
          }}
          nextLabel="Finish Lesson"
        />
      }
    >
      <Blinky
        mood="happy"
        message="You've done amazing work today! Let's do a quick recap to see what you remember. Then you'll get a special take-home mission!"
      />

      {/* Q1: Explain misinformation */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
        <label className="text-sm font-bold text-amber-900 mb-2 block">
          1. Explain misinformation in your own words.
        </label>
        <textarea
          value={misinfo}
          onChange={(e) => setMisinfo(e.target.value)}
          placeholder="Misinformation is..."
          rows={2}
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-amber-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Q2: Spot suspicious headline */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4">
        <label className="text-sm font-bold text-rose-900 mb-2 block">
          2. Which of these headlines is suspicious?
        </label>
        <div className="space-y-2">
          {recapQuestions.suspiciousHeadlineOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSuspicious(opt.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm border-2 transition-all ${
                suspicious === opt.id
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
        {checked && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold animate-fade-up">
            {suspiciousCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Correct!</span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> Look for sensational language and no source — try again!</span>
            )}
          </div>
        )}
      </div>

      {/* Q3: Why does checking matter */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
        <label className="text-sm font-bold text-sky-900 mb-2 block">
          3. Why does a headline need checking before you believe or share it?
        </label>
        <textarea
          value={whyChecking}
          onChange={(e) => setWhyChecking(e.target.value)}
          placeholder="I need to check because..."
          rows={2}
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Q4: STOP CHECK THINK */}
      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
        <label className="text-sm font-bold text-violet-900 mb-2 block">
          4. What are the three steps of fact-checking? (Write them in order!)
        </label>
        <input
          value={sct}
          onChange={(e) => setSct(e.target.value)}
          placeholder="____ → ____ → ____"
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:border-violet-400 focus:outline-none transition-colors text-center"
        />
        {checked && (
          <p className={`mt-2 text-xs font-semibold ${sct.toUpperCase().includes('STOP') && sct.toUpperCase().includes('CHECK') && sct.toUpperCase().includes('THINK') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {sct.toUpperCase().includes('STOP') && sct.toUpperCase().includes('CHECK') && sct.toUpperCase().includes('THINK') ? '✓ Correct!' : 'Remember: STOP → CHECK → THINK'}
          </p>
        )}
      </div>

      {/* Q5: Verdict choice */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
        <label className="text-sm font-bold text-slate-800 mb-2 block">
          5. {recapQuestions.verdictScenario}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {recapQuestions.verdictOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setVerdict(opt.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                verdict === opt.id
                  ? 'bg-slate-700 text-white border-slate-700'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
        {checked && (
          <p className={`mt-2 text-xs font-semibold flex items-center gap-1 animate-fade-up ${verdictCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
            {verdictCorrect ? <><CheckCircle2 className="w-4 h-4" /> Correct! {recapQuestions.verdictReasoning}</> : <><XCircle className="w-4 h-4" /> {recapQuestions.verdictReasoning}</>}
          </p>
        )}
      </div>

      {/* Check answers */}
      <button
        onClick={() => setChecked(true)}
        disabled={!suspicious || !verdict || !sct}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-colors disabled:opacity-40"
      >
        Check My Answers
      </button>

      {/* Reflection */}
      <div className="bg-gradient-to-br from-sky-50 to-emerald-50 border-2 border-sky-200 rounded-2xl p-5">
        <label className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Finish this sentence:
        </label>
        <p className="text-base font-heading font-semibold text-slate-700 mb-2">
          "Before I believe or share something I see online, I will..."
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Complete the sentence in your own words..."
          rows={3}
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {canComplete && (
        <Blinky
          mood="excited"
          message="Fantastic work, Tiwa! You're now a real misinformation detective. There's one more thing — a take-home mission. Want to see it?"
        />
      )}

      {canComplete && (
        <button
          onClick={() => {
            save();
            onGoTakeHome();
          }}
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all shadow-md shadow-amber-100"
        >
          See My Take-Home Mission →
        </button>
      )}
    </StageShell>
  );
}
