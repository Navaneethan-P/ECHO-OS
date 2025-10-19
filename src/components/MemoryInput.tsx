import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface MemoryInputProps {
  onSubmit: (title: string, content: string) => void;
  isAnimating?: boolean;
}

export function MemoryInput({ onSubmit, isAnimating = false }: MemoryInputProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's the seed of this idea?"
          className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          disabled={isAnimating}
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let your thoughts flow..."
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
          disabled={isAnimating}
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || !content.trim() || isAnimating}
        className={`
          w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2
          transition-all duration-300
          ${isAnimating || !title.trim() || !content.trim()
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:scale-105'
          }
        `}
      >
        <Sparkles className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
        {isAnimating ? 'Planting seed...' : 'Plant Idea Seed'}
      </button>
    </form>
  );
}
