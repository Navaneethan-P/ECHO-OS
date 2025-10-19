import { useState, useEffect } from 'react';
import { Brain, Sparkles, Network } from 'lucide-react';
import { Memory, MemoryConnection, Insight } from './types';
import { MemoryNexusAgent, InsightWeaverAgent, EvolutionCatalystAgent } from './utils/aiAgents';
import { GlassCard } from './components/GlassCard';
import { ConstellationView } from './components/ConstellationView';
import { MemoryInput } from './components/MemoryInput';
import { ProgressTracker } from './components/ProgressTracker';
import { InsightPanel } from './components/InsightPanel';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { LevelUpNotification } from './components/LevelUpNotification';

const memoryNexus = new MemoryNexusAgent();
const insightWeaver = new InsightWeaverAgent();
const evolutionCatalyst = new EvolutionCatalystAgent();

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [connections, setConnections] = useState<MemoryConnection[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [newInsight, setNewInsight] = useState<Insight | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  const progress = evolutionCatalyst.calculateProgress(
    memories.length,
    insights.length,
    connections.length
  );

  useEffect(() => {
    if (progress.level > currentLevel) {
      setCurrentLevel(progress.level);
      setShowLevelUp(true);
    }
  }, [progress.level, currentLevel]);

  const handleAddMemory = async (title: string, content: string) => {
    setIsAnimating(true);

    const analysis = await memoryNexus.analyzeMemory(content, title);

    const newMemory: Memory = {
      id: crypto.randomUUID(),
      title,
      content,
      emotionalTag: analysis.emotionalTag,
      importance: analysis.importance,
      createdAt: new Date(),
      metadata: {}
    };

    setMemories(prev => [...prev, newMemory]);

    setTimeout(async () => {
      const newConnections = await memoryNexus.findConnections(newMemory, memories);
      setConnections(prev => [...prev, ...newConnections]);

      const allMemories = [...memories, newMemory];
      const allConnections = [...connections, ...newConnections];

      if (allMemories.length >= 2) {
        const newInsights = await insightWeaver.generateInsights(allMemories, allConnections);

        if (newInsights.length > 0) {
          const latestInsight = newInsights[newInsights.length - 1];
          setInsights(prev => [...prev, ...newInsights]);
          setNewInsight(latestInsight);

          setTimeout(() => setNewInsight(null), 3000);
        }
      }

      setIsAnimating(false);
    }, 1000);
  };

  if (showWelcome) {
    return <WelcomeAnimation onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-purple-950/20 to-pink-950/20"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    ECHO OS NEXUS
                  </h1>
                  <p className="text-xs text-white/60">Your Mind's Operating System</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">Level {progress.level}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <ProgressTracker
                totalMemories={memories.length}
                totalInsights={insights.length}
                totalConnections={connections.length}
                level={progress.level}
                xp={progress.xp}
                nextLevelXp={progress.nextLevelXp}
                motivation={evolutionCatalyst.generateMotivation(progress.level)}
              />
            </div>

            <div className="lg:col-span-2">
              <GlassCard>
                <MemoryInput onSubmit={handleAddMemory} isAnimating={isAnimating} />
              </GlassCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassCard className="h-[600px]">
                <div className="flex items-center gap-2 mb-4">
                  <Network className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold">Memory Constellation</h2>
                  {isAnimating && (
                    <div className="ml-auto flex items-center gap-2 text-cyan-400 text-sm">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Forming connections...</span>
                    </div>
                  )}
                </div>

                {memories.length === 0 ? (
                  <div className="h-[500px] flex items-center justify-center text-center">
                    <div className="space-y-4">
                      <Brain className="w-16 h-16 text-cyan-400/50 mx-auto" />
                      <p className="text-white/60 max-w-md">
                        Your constellation awaits its first star. Plant an idea seed to begin your journey.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ConstellationView memories={memories} connections={connections} />
                )}
              </GlassCard>
            </div>

            <div className="lg:col-span-1">
              <InsightPanel insights={insights} newInsight={newInsight} />
            </div>
          </div>

          {memories.length > 0 && (
            <div className="mt-6">
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold">Recent Memories</h2>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {[...memories]
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                    .map((memory) => {
                      const emotionColors: Record<string, string> = {
                        joy: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
                        curiosity: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
                        frustration: 'from-red-500/20 to-orange-500/20 border-red-500/30',
                        breakthrough: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
                        reflection: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30'
                      };

                      return (
                        <div
                          key={memory.id}
                          className={`
                            p-4 rounded-xl bg-gradient-to-br ${emotionColors[memory.emotionalTag]}
                            border backdrop-blur-sm transition-all hover:scale-[1.02]
                          `}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-white">{memory.title}</h3>
                            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
                              {memory.emotionalTag}
                            </span>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{memory.content}</p>
                          <div className="mt-2 text-xs text-white/40">
                            {memory.createdAt.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </GlassCard>
            </div>
          )}
        </main>
      </div>

      {showLevelUp && (
        <LevelUpNotification
          level={progress.level}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </div>
  );
}

export default App;
