import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Eye, HelpCircle, Key, MessageCircleQuestion, RotateCcw } from 'lucide-react';
import type { TutorSupport } from '@/lib/lessonData';

interface TutorPanelProps {
  stageId: string;
  support: TutorSupport;
}

export default function TutorPanel({ stageId, support }: TutorPanelProps) {
  const [open, setOpen] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState(false);

  const sections = [
    { icon: MessageCircleQuestion, label: 'SAY', content: support.say, color: 'bg-sky-50 border-sky-200 text-sky-900' },
    { icon: HelpCircle, label: 'ASK', content: support.ask, color: 'bg-amber-50 border-amber-200 text-amber-900' },
    { icon: Eye, label: 'LOOK FOR', content: support.lookFor, color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
    { icon: RotateCcw, label: 'IF HE STRUGGLES', content: support.ifStruggles, color: 'bg-rose-50 border-rose-200 text-rose-900' },
  ];

  if (support.followUp) {
    sections.push({ icon: Lightbulb, label: 'FOLLOW-UP', content: support.followUp, color: 'bg-violet-50 border-violet-200 text-violet-900' });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-semibold">Tutor Guide</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 w-80 sm:w-96 max-h-[75vh] overflow-y-auto animate-slide-in-right">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-2xl sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold font-heading">Tutor Guide — {stageId}</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 rounded-lg p-1 transition-colors">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-slate-400 italic">
              This panel is for the tutor only. Answers stay hidden until you reveal them.
            </p>

            {sections.map((s) => (
              <div key={s.label} className={`rounded-xl border p-3 ${s.color}`}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold tracking-wide">{s.label}</span>
                </div>
                <p className="text-xs leading-relaxed">{s.content}</p>
              </div>
            ))}

            {support.answerKey && (
              <div className="rounded-xl border-2 border-slate-300 bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-700" />
                  <span className="text-xs font-bold tracking-wide text-slate-700">ANSWER KEY</span>
                </div>
                {!revealedAnswer ? (
                  <button
                    onClick={() => setRevealedAnswer(true)}
                    className="w-full text-xs bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    Reveal Answer Key
                  </button>
                ) : (
                  <div className="animate-fade-up">
                    <p className="text-xs leading-relaxed text-slate-800 bg-white rounded-lg p-2 border border-slate-200">
                      {support.answerKey}
                    </p>
                    <button
                      onClick={() => setRevealedAnswer(false)}
                      className="mt-2 w-full text-xs text-slate-500 hover:text-slate-700 py-1"
                    >
                      Hide answer key
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
