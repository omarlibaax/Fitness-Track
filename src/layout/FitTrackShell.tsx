import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Dumbbell,
  Flame,
  Menu,
  Moon,
  SunMedium,
  User,
  UtensilsCrossed,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: Activity },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
];

type FitTrackShellProps = {
  children: ReactNode;
};

export function FitTrackShell({ children }: FitTrackShellProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-slate-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 px-6 py-8 border-r border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Flame className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Welcome to</p>
            <p className="text-lg font-semibold tracking-tight">FitTrack Pro</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-accent/20 text-accent shadow-glass'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-accent" />
            Premium fitness dashboard
          </span>
          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition"
          >
            {darkMode ? (
              <Moon className="h-4 w-4 text-accent" />
            ) : (
              <SunMedium className="h-4 w-4 text-yellow-300" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Flame className="h-5 w-5 text-accent" />
          </div>
          <span className="font-semibold tracking-tight">FitTrack Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition"
          >
            {darkMode ? (
              <Moon className="h-4 w-4 text-accent" />
            ) : (
              <SunMedium className="h-4 w-4 text-yellow-300" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 left-0 z-30 w-64 px-6 py-8 border-r border-white/5 bg-slate-950/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mt-10 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                        active
                          ? 'bg-accent/20 text-accent shadow-glass'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:pl-0 min-h-screen">
        <div className="hidden lg:block h-6" />
        <div className="pt-16 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-10 w-full max-w-6xl mx-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

