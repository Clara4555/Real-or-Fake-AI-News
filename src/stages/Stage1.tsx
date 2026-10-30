import { useState, useEffect } from 'react';
import StageShell, { StageNav } from '@/components/StageShell';
import Blinky from '@/components/Blinky';
import { challengeHeadlines, challengeAnswerKey } from '@/lib/lessonData';
import { supabase } from '@/lib/supabase';
import { Newspaper, Eye, AlertTriangle, ClipboardList } from 'lucide-react';

interface Stage1Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Stage1({ onComplete, onBack }: Stage1Props) {
  const [believed, setBelieved] = useState('');
  const [suspicious, setSuspicious] = useState('');
  const [whatYouNeed, setWhatYouNeed] = useState('');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    supabase.from('headline_challenge').select('*').maybeSingle().then(({ data }) => {
      if (data) {
        setBelieved(data.believed_headline || '');
        setSuspicious(data.suspicious_headline || '');
        setWhatYouNeed(data.what_you_need || '');
      }
    });
  }, []);

  const save = () => {
    supabase.from('headline_challenge').select('id').maybeSingle().then(({ data }) => {
      const payload = {
        believed_headline: believed,
        suspicious_headline: suspicious,
        what_you_need: whatYouNeed,
        updated_at: new Date().toISOString(),
      };
      if (data) {
        supabase.from('headline_challenge').update(payload).eq('id', data.id).then();
      } else {
        supabase.from('headline_challenge').insert(payload).then();
      }
    });
  };

  const canContinue = believed && suspicious && whatYouNeed.trim().length > 0;

  return (
    <StageShell
      title="The Headline Challenge"
      subtitle="Three headlines are waiting. Which ones would you believe?"
      duration="4 minutes"
      footer={
        <StageNav
          onBack={onBack}
          onNext={() => {
            save();
            onComplete();
          }}
          nextLabel="Start Investigation"
        />
      }
    >
      <Blinky
        mood="excited"
        message="Hi Tiwa! I'm Blinky, your investigation buddy. I found three headlines. But here's the catch — I'm not telling you which ones are real yet! That's YOUR job to figure out. Ready?"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {challengeHeadlines.map((h) => (
          <div
            key={h.id}
            className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">{h.emoji}</div>
            <div className="text-xs font-semibold text-sky-600 bg-sky-50 inline-block px-2 py-0.5 rounded-full mb-2">
              {h.topic}
            </div>
            <p className="text-sm font-heading font-semibold text-slate-800 leading-snug">{h.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 space-y-4">
        <h3 className="font-heading text-base font-semibold text-amber-900 flex items-center gap-2">
          <ClipboardList className="w-4 h-4" /> Over to you, Tiwa
        </h3>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <Eye className="w-4 h-4 text-emerald-500" /> Which headline do you believe?
          </label>
          <div className="flex flex-wrap gap-2">
            {challengeHeadlines.map((h) => (
              <button
                key={h.id}
                onClick={() => setBelieved(h.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                  believed === h.id
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {h.emoji} {h.text.slice(0, 30)}…
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Which one makes you suspicious?
          </label>
          <div className="flex flex-wrap gap-2">
            {challengeHeadlines.map((h) => (
              <button
                key={h.id}
                onClick={() => setSuspicious(h.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                  suspicious === h.id
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'
                }`}
              >
                {h.emoji} {h.text.slice(0, 30)}…
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
            <Newspaper className="w-4 h-4 text-sky-500" /> What would you need to know before believing any of them?
          </label>
          <textarea
            value={whatYouNeed}
            onChange={(e) => setWhatYouNeed(e.target.value)}
            placeholder="I would need to know..."
            rows={3}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:border-sky-400 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-left hover:bg-slate-100 transition-colors"
      >
        <p className="text-xs font-bold text-slate-500 mb-1">BLINKY'S HINT</p>
        <p className="text-sm text-slate-700">
          {revealed
            ? challengeAnswerKey.say
            : 'Tap to reveal a hint from Blinky about headlines…'}
        </p>
      </button>

      {canContinue && (
        <Blinky
          mood="thinking"
          message="Great thinking! An exciting headline grabs our attention — but attention is NOT proof. Let's learn how to tell what's real."
        />
      )}
    </StageShell>
  );
}
