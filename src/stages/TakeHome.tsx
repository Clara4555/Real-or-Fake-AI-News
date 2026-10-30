import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { supabase } from '@/lib/supabase';
import { Hand, Search, Brain, Home, Trophy, FileText } from 'lucide-react';

interface TakeHomeProps {
  onBack: () => void;
  lessonComplete: boolean;
}

const VERDICTS = ['TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'] as const;

export default function TakeHome({ onBack, lessonComplete }: TakeHomeProps) {
  const [headline, setHeadline] = useState('');
  const [whyCheck, setWhyCheck] = useState('');
  const [sourceUsed, setSourceUsed] = useState('');
  const [discovered, setDiscovered] = useState('');
  const [verdict, setVerdict] = useState('');
  const [explanation, setExplanation] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('takehome_mission').select('*').maybeSingle().then(({ data }) => {
      if (data) {
        setHeadline(data.headline_claim || '');
        setWhyCheck(data.why_check || '');
        setSourceUsed(data.source_used || '');
        setDiscovered(data.what_discovered || '');
        setVerdict(data.verdict || '');
        setExplanation(data.explanation || '');
      }
    });
  }, []);

  const save = () => {
    const payload = {
      headline_claim: headline,
      why_check: whyCheck,
      source_used: sourceUsed,
      what_discovered: discovered,
      verdict,
      explanation,
      updated_at: new Date().toISOString(),
    };
    supabase.from('takehome_mission').select('id').maybeSingle().then(({ data }) => {
      if (data) {
        supabase.from('takehome_mission').update(payload).eq('id', data.id).then(() => setSaved(true));
      } else {
        supabase.from('takehome_mission').insert(payload).then(() => setSaved(true));
      }
    });
  };

  const isComplete = headline.trim() && whyCheck.trim() && sourceUsed.trim() && discovered.trim() && verdict && explanation.trim();

  return (
    <StageShell
      title="My Fact-Checking Mission"
      subtitle="Your take-home assignment — be a detective at home!"
      duration="10–15 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={save}
          nextLabel="Save My Mission"
        />
      }
    >
      <Blinky
        mood="excited"
        message="You've learned so much today! Now it's time for a real mission at home. Find ONE headline and investigate it using STOP-CHECK-THINK. A grown-up can help you find a good headline, but the thinking is all yours!"
      />

      {/* Instructions */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 space-y-2">
        <h3 className="font-heading text-sm font-bold text-sky-900 flex items-center gap-2">
          <Home className="w-4 h-4" /> Your Mission
        </h3>
        <div className="text-xs text-sky-800 space-y-1">
          <p>1. Find one headline or factual claim from an age-appropriate, supervised source.</p>
          <p>2. Use STOP → CHECK → THINK to investigate it.</p>
          <p>3. Fill in the template below with your findings.</p>
          <p>4. Write your verdict and explain it in your own words.</p>
        </div>
        <p className="text-xs text-sky-600 italic mt-2">
          A parent or guardian can help find a source. No AI account, paid tool, or personal information needed.
        </p>
      </div>

      {/* STOP-CHECK-THINK reminder */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-3 flex items-center gap-4 text-xs justify-center">
        <span className="font-bold text-rose-600 flex items-center gap-1"><Hand className="w-3.5 h-3.5" />STOP</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-sky-600 flex items-center gap-1"><Search className="w-3.5 h-3.5" />CHECK</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-violet-600 flex items-center gap-1"><Brain className="w-3.5 h-3.5" />THINK</span>
      </div>

      {/* Template */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> My Fact-Checking Mission Template
        </h3>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">1. The headline or claim</label>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Write the headline you found..."
            rows={2}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block flex items-center gap-1.5">
            <Hand className="w-3.5 h-3.5 text-rose-500" /> 2. Why I decided to check it (STOP)
          </label>
          <textarea
            value={whyCheck}
            onChange={(e) => setWhyCheck(e.target.value)}
            placeholder="I decided to check this because..."
            rows={2}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-sky-500" /> 3. The source I used to investigate it (CHECK)
          </label>
          <input
            value={sourceUsed}
            onChange={(e) => setSourceUsed(e.target.value)}
            placeholder="Which website or source did you use?"
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-violet-500" /> 4. What I discovered (THINK)
          </label>
          <textarea
            value={discovered}
            onChange={(e) => setDiscovered(e.target.value)}
            placeholder="I discovered that..."
            rows={2}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-violet-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-2 block">5. My verdict</label>
          <div className="flex flex-wrap gap-2">
            {VERDICTS.map((v) => (
              <button
                key={v}
                onClick={() => setVerdict(v)}
                className={`px-4 py-2 rounded-lg text-xs font-bold border-2 transition-all ${
                  verdict === v
                    ? 'bg-slate-700 text-white border-slate-700'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">6. My explanation of the verdict</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="I chose this verdict because..."
            rows={3}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {saved && isComplete && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center animate-fade-up">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
          <h3 className="font-heading text-lg font-bold text-emerald-800 mb-1">Mission Saved!</h3>
          <p className="text-sm text-emerald-700">
            Your fact-checking mission has been saved. Great work, Tiwa — you're a real misinformation detective!
          </p>
        </div>
      )}

      {lessonComplete && (
        <Blinky
          mood="happy"
          message="You completed the whole lesson! You learned what fake news is, how to spot suspicious headlines, and how to use STOP-CHECK-THINK. Use your new skills whenever you see something online. I'm proud of you!"
        />
      )}
    </StageShell>
  );
}
