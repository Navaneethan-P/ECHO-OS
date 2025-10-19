export type EmotionalTag = 'joy' | 'curiosity' | 'frustration' | 'breakthrough' | 'reflection';

export type ConnectionType = 'related' | 'contradicts' | 'expands' | 'applies';

export type InsightType = 'connection' | 'pattern' | 'breakthrough' | 'evolution';

export interface Memory {
  id: string;
  title: string;
  content: string;
  emotionalTag: EmotionalTag;
  importance: number;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface MemoryConnection {
  id: string;
  fromMemoryId: string;
  toMemoryId: string;
  strength: number;
  connectionType: ConnectionType;
  createdAt: Date;
}

export interface Insight {
  id: string;
  content: string;
  noveltyScore: number;
  sourceMemoryIds: string[];
  insightType: InsightType;
  createdAt: Date;
}

export interface UserProgress {
  totalMemories: number;
  totalInsights: number;
  totalConnections: number;
  currentLevel: number;
  experiencePoints: number;
  skillTree: Record<string, boolean>;
  achievementConstellations: Record<string, any>;
}
