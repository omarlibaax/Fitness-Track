import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { useFitTrack } from '../state/useFitTrackState';
import { Dumbbell, Timer, Flame } from 'lucide-react';

type Exercise = {
  id: string;
  name: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  focus: string;
};

const EXERCISES: Exercise[] = [
  {
    id: 'hiit',
    name: 'HIIT Blast',
    duration: 20,
    difficulty: 'Advanced',
    calories: 260,
    focus: 'Full body, conditioning',
  },
  {
    id: 'push',
    name: 'Push Power',
    duration: 35,
    difficulty: 'Intermediate',
    calories: 340,
    focus: 'Chest, shoulders, triceps',
  },
  {
    id: 'legs',
    name: 'Leg Day',
    duration: 40,
    difficulty: 'Intermediate',
    calories: 380,
    focus: 'Glutes, quads, hamstrings',
  },
  {
    id: 'core',
    name: 'Core Stability',
    duration: 18,
    difficulty: 'Beginner',
    calories: 160,
    focus: 'Core, posture',
  },
];

export function Workouts() {
  const { addWorkout } = useFitTrack();
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startWorkout = (exercise: Exercise) => {
    setSelected(exercise);
    setTimer(exercise.duration * 60);
    setIsRunning(true);

    const start = Date.now();
    const end = start + exercise.duration * 60 * 1000;

    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((end - Date.now()) / 1000));
      setTimer(remaining);
      if (remaining === 0) {
        window.clearInterval(interval);
        setIsRunning(false);
        addWorkout({
          id: `${exercise.id}-${Date.now()}`,
          name: exercise.name,
          durationMinutes: exercise.duration,
          calories: exercise.calories,
          date: new Date().toISOString(),
        });
      }
    }, 1000);
  };

  const formatTimer = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Training Studio
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Plan, start, and track your workouts.
          </h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {EXERCISES.map((ex) => (
          <Card
            key={ex.id}
            className="p-5 flex flex-col justify-between hover:-translate-y-1 hover:border-accent/40 transition-transform"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-accent/10 text-[11px] text-accent mb-3">
                  <Dumbbell className="h-3 w-3" />
                  <span>{ex.difficulty}</span>
                </div>
                <p className="text-base font-semibold">{ex.name}</p>
                <p className="mt-1 text-xs text-slate-400">{ex.focus}</p>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <span className="flex items-center gap-1 justify-end">
                  <Timer className="h-3 w-3" />
                  {ex.duration} min
                </span>
                <span className="flex items-center gap-1 justify-end">
                  <Flame className="h-3 w-3 text-accent" />
                  {ex.calories} kcal
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => startWorkout(ex)}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent/90 text-slate-900 text-xs font-semibold px-4 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              Start workout
            </button>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <Card className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-accent/40">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Active Session
                </p>
                <p className="mt-1 text-lg font-semibold">{selected.name}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Stay focused. Your future self is watching.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[11px] text-slate-400 mb-1">Remaining</p>
                  <p className="text-2xl font-semibold tabular-nums">
                    {formatTimer(timer)}
                  </p>
                </div>
                <div className="text-xs text-slate-400">
                  <p className="flex items-center gap-1">
                    <Timer className="h-3 w-3" /> {selected.duration} min
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <Flame className="h-3 w-3 text-accent" />{' '}
                    {selected.calories} kcal
                  </p>
                </div>
                {!isRunning && timer === 0 && (
                  <span className="text-[11px] text-accent font-medium">
                    Workout logged to history
                  </span>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

