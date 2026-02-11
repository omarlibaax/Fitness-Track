import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Profile = {
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  goal: 'lose' | 'gain' | 'maintain';
  avatarDataUrl?: string;
};

type WorkoutSession = {
  id: string;
  name: string;
  durationMinutes: number;
  calories: number;
  date: string;
};

type MealEntry = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
};

type WeightEntry = {
  date: string;
  weightKg: number;
};

type DailyMetrics = {
  steps: number;
  caloriesBurned: number;
  waterMl: number;
  targetSteps: number;
  targetWaterMl: number;
};

type FitTrackState = {
  profile: Profile;
  setProfile(profile: Profile): void;
  workouts: WorkoutSession[];
  addWorkout(workout: WorkoutSession): void;
  meals: MealEntry[];
  addMeal(meal: MealEntry): void;
  weights: WeightEntry[];
  addWeight(entry: WeightEntry): void;
  daily: DailyMetrics;
  setDaily(metrics: DailyMetrics): void;
};

const STORAGE_KEY = 'fittrack-pro-state-v1';

const defaultState: FitTrackState = {
  profile: {
    name: 'Athlete',
    age: 25,
    heightCm: 175,
    weightKg: 72,
    goal: 'maintain',
  },
  workouts: [],
  meals: [],
  weights: [],
  daily: {
    steps: 5400,
    caloriesBurned: 420,
    waterMl: 1600,
    targetSteps: 10000,
    targetWaterMl: 2500,
  },
  setProfile: () => {},
  addWorkout: () => {},
  addMeal: () => {},
  addWeight: () => {},
  setDaily: () => {},
};

const FitTrackContext = createContext<FitTrackState>(defaultState);

function loadInitialState(): FitTrackState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored) as FitTrackState;
    return {
      ...defaultState,
      ...parsed,
    };
  } catch {
    return defaultState;
  }
}

export function FitTrackProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FitTrackState>(() => loadInitialState());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value: FitTrackState = {
    ...state,
    setProfile(profile) {
      setState((prev) => ({ ...prev, profile }));
    },
    addWorkout(workout) {
      setState((prev) => ({ ...prev, workouts: [workout, ...prev.workouts] }));
    },
    addMeal(meal) {
      setState((prev) => ({ ...prev, meals: [meal, ...prev.meals] }));
    },
    addWeight(entry) {
      setState((prev) => ({
        ...prev,
        weights: [...prev.weights.filter((w) => w.date !== entry.date), entry],
      }));
    },
    setDaily(metrics) {
      setState((prev) => ({ ...prev, daily: metrics }));
    },
  };

  return (
    <FitTrackContext.Provider value={value}>
      {children}
    </FitTrackContext.Provider>
  );
}

export function useFitTrack() {
  return useContext(FitTrackContext);
}

