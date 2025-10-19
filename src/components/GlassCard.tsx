import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = '', glow = false }: GlassCardProps) {
  return (
    <div
      className={`
        backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6
        ${glow ? 'shadow-[0_0_30px_rgba(0,255,255,0.3)]' : 'shadow-xl'}
        transition-all duration-300 hover:bg-white/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}
