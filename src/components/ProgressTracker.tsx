import React from 'react';
import { Brain, Zap, Network, TrendingUp } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ProgressTrackerProps {
  totalMemories: number;
  totalInsights: number;
  totalConnections: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  motivation: string;
}

export function ProgressTracker({
  totalMemories,
  totalInsights,
  totalConnections,
  level,
  xp,
  nextLevelXp,
  motivation
}: ProgressTrackerProps) {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <GlassCard glow>
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full border border-cyan-500/30 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-white">Level {level}</span>
          </div>
          <p className="text-cyan-300 italic">{motivation}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>Evolution Progress</span>
            <span>{xp} / {nextLevelXp} XP</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full animate-pulse bg-white/20"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalMemories}</div>
            <div className="text-xs text-white/60">Memories</div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalInsights}</div>
            <div className="text-xs text-white/60">Insights</div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center border border-pink-500/30">
              <Network className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalConnections}</div>
            <div className="text-xs text-white/60">Connections</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
