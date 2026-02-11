import { Card } from '../components/ui/Card';
import { useFitTrack } from '../state/useFitTrackState';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Activity, BadgeCheck } from 'lucide-react';

function calculateBMI(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  if (!h) return 0;
  return weightKg / (h * h);
}

export function Progress() {
  const { profile, weights, workouts } = useFitTrack();

  const sortedWeights = [...weights].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const latestWeight = sortedWeights.at(-1)?.weightKg ?? profile.weightKg;
  const startingWeight = sortedWeights[0]?.weightKg ?? profile.weightKg;

  const bmi = calculateBMI(latestWeight, profile.heightCm);

  let goalProgressPct = 50;
  if (profile.goal === 'lose') {
    const target = startingWeight - 5;
    const distanceTotal = startingWeight - target;
    const distanceDone = startingWeight - latestWeight;
    goalProgressPct = Math.min(
      100,
      Math.max(0, (distanceDone / distanceTotal) * 100 || 0),
    );
  } else if (profile.goal === 'gain') {
    const target = startingWeight + 5;
    const distanceTotal = target - startingWeight;
    const distanceDone = latestWeight - startingWeight;
    goalProgressPct = Math.min(
      100,
      Math.max(0, (distanceDone / distanceTotal) * 100 || 0),
    );
  } else {
    goalProgressPct = 100 - Math.min(100, Math.abs(latestWeight - startingWeight) * 5);
  }

  const weightChartData =
    sortedWeights.length > 0
      ? sortedWeights.map((w) => ({
          date: w.date.slice(5, 10),
          weight: w.weightKg,
        }))
      : [
          { date: 'Start', weight: startingWeight },
          { date: 'Now', weight: latestWeight },
        ];

  const weeklyWorkoutCount = workouts.reduce<Record<string, number>>(
    (acc, w) => {
      const day = w.date.slice(0, 10);
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {},
  );

  const workoutDays = Object.entries(weeklyWorkoutCount)
    .slice(-7)
    .map(([day, count]) => ({
      day: day.slice(5, 10),
      sessions: count,
    }));

  const badges = [
    {
      id: 'starter',
      label: 'Consistency Starter',
      description: 'Logged your first metric',
      unlocked: weights.length + workouts.length > 0,
    },
    {
      id: 'momentum',
      label: 'Momentum Builder',
      description: 'Completed 5+ workouts',
      unlocked: workouts.length >= 5,
    },
    {
      id: 'analyst',
      label: 'Data-Driven',
      description: 'Logged weight on 7 different days',
      unlocked: new Set(weights.map((w) => w.date.slice(0, 10))).size >= 7,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Progress Intelligence
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Visualize how far you&apos;ve come.
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Weight Trend
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Track the trajectory, not just the number
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData}>
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderRadius: 12,
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#00FF88"
                  strokeWidth={2.2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  BMI Snapshot
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {bmi ? bmi.toFixed(1) : '--'}
                </p>
              </div>
              <div className="h-9 w-9 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-accent" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Based on your latest weight ({latestWeight} kg) and height (
              {profile.heightCm} cm).
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
              Goal Progress
            </p>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
              <div
                style={{ width: `${goalProgressPct}%` }}
                className="h-full rounded-full bg-gradient-to-r from-accent via-emerald-400 to-sky-400"
              />
            </div>
            <p className="text-xs text-slate-300">
              {goalProgressPct.toFixed(0)}% towards your current goal to{' '}
              {profile.goal === 'lose'
                ? 'lose weight'
                : profile.goal === 'gain'
                ? 'gain muscle'
                : 'maintain your shape'}
              .
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
              Weekly Sessions
            </p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workoutDays}>
                  <XAxis
                    dataKey="day"
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderRadius: 12,
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
          Achievement Badges
        </p>
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs ${
                b.unlocked
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400'
              }`}
            >
              <BadgeCheck
                className={`h-4 w-4 ${
                  b.unlocked ? 'text-accent' : 'text-slate-500'
                }`}
              />
              <div>
                <p className="font-medium">{b.label}</p>
                <p className="text-[10px] text-slate-400">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

