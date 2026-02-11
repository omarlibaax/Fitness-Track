import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useFitTrack } from '../state/useFitTrackState';
import { motion } from 'framer-motion';
import { Camera, User } from 'lucide-react';

export function Profile() {
  const { profile, setProfile } = useFitTrack();
  const [localProfile, setLocalProfile] = useState(profile);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLocalProfile((prev) => ({
        ...prev,
        avatarDataUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProfile({
      ...localProfile,
      age: Number(localProfile.age) || 0,
      heightCm: Number(localProfile.heightCm) || 0,
      weightKg: Number(localProfile.weightKg) || 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Profile
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Personalize your FitTrack experience.
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card className="p-5 flex flex-col items-center text-center">
          <div className="relative">
            <motion.div
              className="h-24 w-24 rounded-full border border-accent/40 bg-slate-900/80 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {localProfile.avatarDataUrl ? (
                <img
                  src={localProfile.avatarDataUrl}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-slate-500" />
              )}
            </motion.div>
            <label className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-slate-900 cursor-pointer shadow-lg">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <p className="mt-3 text-sm font-semibold">{localProfile.name}</p>
          <p className="mt-1 text-xs text-slate-400">
            {localProfile.goal === 'lose'
              ? 'Leaning out'
              : localProfile.goal === 'gain'
              ? 'Building muscle'
              : 'Staying in peak form'}
          </p>
        </Card>

        <Card className="p-5">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs text-slate-400 mb-1">
                Display name
              </label>
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={localProfile.name}
                onChange={(e) =>
                  setLocalProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Age</label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={localProfile.age}
                onChange={(e) =>
                  setLocalProfile((p) => ({
                    ...p,
                    age: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={localProfile.heightCm}
                onChange={(e) =>
                  setLocalProfile((p) => ({
                    ...p,
                    heightCm: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60"
                value={localProfile.weightKg}
                onChange={(e) =>
                  setLocalProfile((p) => ({
                    ...p,
                    weightKg: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs text-slate-400 mb-1">
                Fitness goal
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'lose', label: 'Lose weight' },
                  { id: 'gain', label: 'Gain muscle' },
                  { id: 'maintain', label: 'Maintain' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setLocalProfile((p) => ({
                        ...p,
                        goal: option.id as typeof localProfile.goal,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs border transition ${
                      localProfile.goal === option.id
                        ? 'border-accent/60 bg-accent/10 text-accent'
                        : 'border-slate-700 bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-accent/90 text-slate-900 text-xs font-semibold px-4 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Save profile
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

