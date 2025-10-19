import { Memory, MemoryConnection, Insight, EmotionalTag, InsightType } from '../types';

export class MemoryNexusAgent {
  async analyzeMemory(content: string, title: string): Promise<{ emotionalTag: EmotionalTag; importance: number }> {
    const lowerContent = (content + title).toLowerCase();

    let emotionalTag: EmotionalTag = 'curiosity';
    if (lowerContent.match(/breakthrough|eureka|discovered|realize/)) {
      emotionalTag = 'breakthrough';
    } else if (lowerContent.match(/happy|excited|love|amazing|wonderful/)) {
      emotionalTag = 'joy';
    } else if (lowerContent.match(/stuck|confused|frustrated|difficult|hard/)) {
      emotionalTag = 'frustration';
    } else if (lowerContent.match(/thinking|wonder|exploring|learning|understand/)) {
      emotionalTag = 'curiosity';
    } else if (lowerContent.match(/reflect|consider|ponder|contemplat/)) {
      emotionalTag = 'reflection';
    }

    const importance = Math.min(5, Math.max(1, Math.ceil(content.length / 100)));

    return { emotionalTag, importance };
  }

  async findConnections(newMemory: Memory, existingMemories: Memory[]): Promise<MemoryConnection[]> {
    const connections: MemoryConnection[] = [];
    const newWords = this.extractKeywords(newMemory.content + ' ' + newMemory.title);

    for (const memory of existingMemories) {
      if (memory.id === newMemory.id) continue;

      const existingWords = this.extractKeywords(memory.content + ' ' + memory.title);
      const commonWords = newWords.filter(word => existingWords.includes(word));

      if (commonWords.length > 0) {
        const strength = Math.min(10, commonWords.length * 2);
        connections.push({
          id: crypto.randomUUID(),
          fromMemoryId: newMemory.id,
          toMemoryId: memory.id,
          strength,
          connectionType: 'related',
          createdAt: new Date()
        });
      }
    }

    return connections.slice(0, 5);
  }

  private extractKeywords(text: string): string[] {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word))
      .slice(0, 10);
  }
}

export class InsightWeaverAgent {
  async generateInsights(memories: Memory[], connections: MemoryConnection[]): Promise<Insight[]> {
    const insights: Insight[] = [];

    if (memories.length < 2) return insights;

    const clusterMap = this.findClusters(memories, connections);

    for (const [topic, memoryIds] of Object.entries(clusterMap)) {
      if (memoryIds.length >= 2) {
        const relatedMemories = memories.filter(m => memoryIds.includes(m.id));
        const breakthroughCount = relatedMemories.filter(m => m.emotionalTag === 'breakthrough').length;

        insights.push({
          id: crypto.randomUUID(),
          content: `You're building a constellation of understanding around ${topic}. ${memoryIds.length} connected ideas are forming a knowledge cluster.`,
          noveltyScore: Math.min(10, memoryIds.length + breakthroughCount * 2),
          sourceMemoryIds: memoryIds,
          insightType: breakthroughCount > 0 ? 'breakthrough' : 'pattern',
          createdAt: new Date()
        });
      }
    }

    const recentBreakthroughs = memories
      .filter(m => m.emotionalTag === 'breakthrough')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);

    if (recentBreakthroughs.length > 0) {
      insights.push({
        id: crypto.randomUUID(),
        content: `Breakthrough momentum detected! You've had ${recentBreakthroughs.length} major realizations recently. This is your evolution accelerating.`,
        noveltyScore: 9,
        sourceMemoryIds: recentBreakthroughs.map(m => m.id),
        insightType: 'evolution',
        createdAt: new Date()
      });
    }

    return insights;
  }

  private findClusters(memories: Memory[], connections: MemoryConnection[]): Record<string, string[]> {
    const clusters: Record<string, string[]> = {};

    memories.forEach(memory => {
      const keywords = memory.title.toLowerCase().split(' ').filter(w => w.length > 3);
      keywords.forEach(keyword => {
        if (!clusters[keyword]) clusters[keyword] = [];
        clusters[keyword].push(memory.id);
      });
    });

    return Object.fromEntries(
      Object.entries(clusters).filter(([_, ids]) => ids.length >= 2)
    );
  }
}

export class EvolutionCatalystAgent {
  calculateProgress(
    totalMemories: number,
    totalInsights: number,
    totalConnections: number
  ): { level: number; xp: number; nextLevelXp: number } {
    const xp = totalMemories * 10 + totalInsights * 25 + totalConnections * 5;
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;
    const nextLevelXp = Math.pow(level, 2) * 100;

    return { level, xp, nextLevelXp };
  }

  checkLevelUp(oldXp: number, newXp: number): boolean {
    const oldLevel = Math.floor(Math.sqrt(oldXp / 100)) + 1;
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
    return newLevel > oldLevel;
  }

  generateMotivation(level: number): string {
    const messages = [
      "Your mind is expanding like a nebula.",
      "Every idea is a new star in your constellation.",
      "You're not just learning, you're evolving.",
      "This is how genius begins.",
      "Your knowledge garden is blooming beautifully.",
      "The connections you're making are extraordinary.",
      "You're becoming the architect of your own understanding.",
    ];
    return messages[level % messages.length];
  }
}
