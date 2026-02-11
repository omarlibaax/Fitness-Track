import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { useFitTrack } from '../state/useFitTrackState';
import { UtensilsCrossed } from 'lucide-react';

export function Nutrition() {
  const { addMeal, meals } = useFitTrack();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const todaysMeals = useMemo(
    () => meals.filter((m) => m.date.slice(0, 10) === today),
    [meals, today],
  );

  const totals = todaysMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const macroTargets = {
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 70,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const meal = {
      id: `${Date.now()}`,
      name: name.trim(),
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      date: new Date().toISOString(),
    };
    addMeal(meal);
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const pct = (value: number, target: number) =>
    Math.min(100, (value / target) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Smart Fuel
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Log your meals and own your macros.
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="p-5">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs text-slate-400 mb-1">
                Meal name
              </label>
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Grilled chicken bowl"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Calories
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="520"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="45"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="18"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-accent/90 text-slate-900 text-xs font-semibold px-4 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Save meal
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-xs text-slate-400">
              Today&apos;s meals ({todaysMeals.length})
            </p>
            <div className="max-h-52 overflow-y-auto pr-1 space-y-2">
              {todaysMeals.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-xs bg-slate-900/60 rounded-xl px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-100">{m.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {m.protein}P / {m.carbs}C / {m.fat}F
                    </p>
                  </div>
                  <p className="font-semibold text-slate-100">
                    {m.calories} kcal
                  </p>
                </div>
              ))}
              {todaysMeals.length === 0 && (
                <p className="text-[11px] text-slate-500">
                  No meals logged yet today. Start with your next plate.
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Daily Macros
              </p>
              <p className="mt-1 text-sm text-slate-300">
                High-level view of your fuel for today
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {(['calories', 'protein', 'carbs', 'fat'] as const).map((key) => {
              const label =
                key === 'calories'
                  ? 'Calories'
                  : key.charAt(0).toUpperCase() + key.slice(1);
              const unit = key === 'calories' ? 'kcal' : 'g';
              const value = totals[key];
              const target = macroTargets[key];
              const valuePct = pct(value, target);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-slate-400">
                      {value}/{target} {unit}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${valuePct}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-accent via-emerald-400 to-sky-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

