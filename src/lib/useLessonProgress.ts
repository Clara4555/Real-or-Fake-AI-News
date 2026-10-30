import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';

export type StageStatus = 'not_started' | 'in_progress' | 'complete';

interface ProgressMap {
  [stageId: string]: StageStatus;
}

const STAGE_IDS = [
  'stage1',
  'stage2',
  'stage3',
  'stage4',
  'stage5',
  'stage6',
  'stage7',
  'takehome',
];

export function useLessonProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('lesson_progress').select('stage_id, status');
    const map: ProgressMap = {};
    if (data) {
      for (const row of data) {
        map[row.stage_id] = row.status as StageStatus;
      }
    }
    setProgress(map);
    setLoaded(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStage = useCallback(
    async (stageId: string, status: StageStatus) => {
      setProgress((prev) => ({ ...prev, [stageId]: status }));

      const { data: existing } = await supabase
        .from('lesson_progress')
        .select('id')
        .eq('stage_id', stageId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('lesson_progress')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('stage_id', stageId);
      } else {
        await supabase.from('lesson_progress').insert({ stage_id: stageId, status });
      }
    },
    [],
  );

  return { progress, loaded, setStage, stageIds: STAGE_IDS };
}
