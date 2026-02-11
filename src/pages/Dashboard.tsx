import { Card } from '../components/ui/Card';
import { useFitTrack } from '../state/useFitTrackState';
import { motion } from 'framer-motion';
import { Activity, Droplets, Flame } from 'lucide-react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', steps: 7200 },
  { day: 'Tue', steps: 9800 },
  { day: 'Wed', steps: 6500 },
  { day: 'Thu', steps: 10300 },
  { day: 'Fri', steps: 8700 },
  { day: 'Sat', steps: 12000 },
  { day: 'Sun', steps: 9300 },
];

export function Dashboard() {
  const { daily, profile } = useFitTrack();
  const stepsPct = Math.min(100, (daily.steps / daily.targetSteps) * 100);
  const waterPct = Math.min(100, (daily.waterMl / daily.targetWaterMl) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400 mb-1">
            Welcome back, {profile.name}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Elevate your health, one day at a time.
          </h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-accent/10 via-transparent to-transparent" />
          <div className="relative flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <Activity className="h-3 w-3 text-accent" />
              Daily Steps
            </span>
            <div className="relative h-36 w-36">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-accent"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                  animate={{
                    strokeDasharray: 2 * Math.PI * 60 * (stepsPct / 100),
                    strokeDashoffset: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-slate-400 mb-1">Steps</p>
                <p className="text-xl font-semibold">
                  {daily.steps.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {stepsPct.toFixed(0)}% of{' '}
                  {daily.targetSteps.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Calories Burned
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {daily.caloriesBurned}
              </p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-accent" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Consistency beats intensity. Keep stacking those active minutes.
          </p>
        </Card>

        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Hydration
              </p>
              <p className="mt-2 text-xl font-semibold">
                {(daily.waterMl / 1000).toFixed(1)} L
              </p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-sky-500/10 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-sky-400" />
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${waterPct}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-accent"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            {waterPct.toFixed(0)}% of daily target{' '}
            {(daily.targetWaterMl / 1000).toFixed(1)} L.
          </p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Weekly Activity
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Steps trend over the last 7 days
            </p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
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
                tickFormatter={(v) => `${v / 1000}k`}
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
                dataKey="steps"
                stroke="#00FF88"
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

