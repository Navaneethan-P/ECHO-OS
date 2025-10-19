import React, { useEffect, useState } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface LevelUpNotificationProps {
  level: number;
  onClose: () => void;
}

export function LevelUpNotification({ level, onClose }: LevelUpNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
        transition-all duration-500
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-3xl opacity-75 animate-pulse"></div>

        <div className="relative backdrop-blur-md bg-white/10 border-2 border-white/20 rounded-3xl p-12 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full flex items-center justify-center border-4 border-white/30 animate-bounce">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                LEVEL UP!
              </h2>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>

            <div className="text-6xl font-bold text-white">
              Level {level}
            </div>

            <p className="text-xl text-cyan-300">
              Your evolution accelerates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
