import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-glass border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-glass ${className}`}
    >
      {children}
    </div>
  );
}

