import { useState, useEffect } from 'react';
import { useLessonProgress } from '@/lib/useLessonProgress';
import { tutorSupport } from '@/lib/lessonData';
import ProgressBar from '@/components/ProgressBar';
import TutorPanel from '@/components/TutorPanel';
import Stage1 from '@/stages/Stage1';
import Stage2 from '@/stages/Stage2';
import Stage3 from '@/stages/Stage3';
import Stage4 from '@/stages/Stage4';
import Stage5 from '@/stages/Stage5';
import Stage6 from '@/stages/Stage6';
import Stage7 from '@/stages/Stage7';
import TakeHome from '@/stages/TakeHome';

const STAGES = [
  { id: 'stage1', label: 'Headline Challenge' },
  { id: 'stage2', label: 'Fake News' },
  { id: 'stage3', label: 'Inspector' },
  { id: 'stage4', label: 'STOP-CHECK-THINK' },
  { id: 'stage5', label: '5 Errors' },
  { id: 'stage6', label: 'Fact-Check' },
  { id: 'stage7', label: 'Recap' },
  { id: 'takehome', label: 'Take-Home' },
];

export default function App() {
  const { progress, loaded, setStage } = useLessonProgress();
  const [current, setCurrent] = useState('stage1');

  useEffect(() => {
    // On load, jump to the first incomplete stage
    if (loaded) {
      const firstIncomplete = STAGES.find((s) => progress[s.id] !== 'complete');
      if (firstIncomplete) {
        setCurrent(firstIncomplete.id);
      }
    }
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (stageId: string) => setCurrent(stageId);

  const completeStage = (stageId: string, nextId?: string) => {
    setStage(stageId, 'complete');
    if (nextId) {
      setStage(nextId, 'in_progress');
      goTo(nextId);
    }
  };

  const currentIndex = STAGES.findIndex((s) => s.id === current);
  const prevId = currentIndex > 0 ? STAGES[currentIndex - 1].id : undefined;
  const nextId = currentIndex < STAGES.length - 1 ? STAGES[currentIndex + 1].id : undefined;

  const renderStage = () => {
    const goPrev = () => prevId && goTo(prevId);
    const goNext = () => {
      if (nextId) {
        setStage(current, 'complete');
        setStage(nextId, 'in_progress');
        goTo(nextId);
      }
    };
    switch (current) {
      case 'stage1':
        return <Stage1 onBack={goPrev} onComplete={goNext} />;
      case 'stage2':
        return <Stage2 onBack={goPrev} onComplete={goNext} />;
      case 'stage3':
        return <Stage3 onBack={goPrev} onComplete={goNext} />;
      case 'stage4':
        return <Stage4 onBack={goPrev} onComplete={goNext} />;
      case 'stage5':
        return <Stage5 onBack={goPrev} onComplete={goNext} />;
      case 'stage6':
        return <Stage6 onBack={goPrev} onComplete={goNext} />;
      case 'stage7':
        return <Stage7 onBack={goPrev} onComplete={goNext} onGoTakeHome={goNext} />;
      case 'takehome':
        return <TakeHome onBack={goPrev} lessonComplete={progress['stage7'] === 'complete'} />;
      default:
        return <Stage1 onBack={goPrev} onComplete={goNext} />;
    }
  };

  const tutorKey = current === 'takehome' ? 'takehome' : current;
  const tutor = tutorSupport[tutorKey] ?? tutorSupport['stage2'];

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl mx-auto mb-3 animate-pulse-soft" />
          <p className="text-sm text-slate-400">Loading your lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <ProgressBar stages={STAGES} progress={progress} currentStage={current} onNavigate={goTo} />
      <div className="pb-24">
        {renderStage()}
      </div>
      <TutorPanel stageId={current} support={tutor} />
    </div>
  );
}
