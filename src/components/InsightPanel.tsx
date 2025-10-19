import React, { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { Insight } from '../types';
import { GlassCard } from './GlassCard';

interface InsightPanelProps {
  insights: Insight[];
  newInsight?: Insight | null;
}

export function InsightPanel({ insights, newInsight }: InsightPanelProps) {
  const [animatingInsight, setAnimatingInsight] = useState<string | null>(null);

  useEffect(() => {
    if (newInsight) {
      setAnimatingInsight(newInsight.id);
      setTimeout(() => setAnimatingInsight(null), 3000);
    }
  }, [newInsight]);

  const sortedInsights = [...insights].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white">
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-bold">Insight Supernovas</h2>
      </div>

      {sortedInsights.length === 0 ? (
        <GlassCard>
          <p className="text-white/60 text-center py-8">
            Your insights will bloom here as your constellation grows...
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {sortedInsights.slice(0, 5).map((insight) => (
            <GlassCard
              key={insight.id}
              glow={animatingInsight === insight.id}
              className={`transition-all duration-500 ${
                animatingInsight === insight.id
                  ? 'scale-105 animate-pulse'
                  : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${insight.insightType === 'breakthrough'
                      ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/50'
                      : 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/50'
                    }
                  `}>
                    <Star className={`w-5 h-5 ${
                      insight.insightType === 'breakthrough' ? 'text-purple-400' : 'text-cyan-400'
                    }`} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${insight.insightType === 'breakthrough'
                        ? 'bg-purple-500/20 text-purple-300'
                        : insight.insightType === 'evolution'
                        ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-cyan-500/20 text-cyan-300'
                      }
                    `}>
                      {insight.insightType}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, Math.ceil(insight.noveltyScore / 2)) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-white/90 leading-relaxed">
                    {insight.content}
                  </p>

                  <div className="mt-2 text-xs text-white/40">
                    {new Date(insight.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
