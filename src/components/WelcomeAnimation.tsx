import React, { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3500),
      setTimeout(() => onComplete(), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
      <div className="text-center space-y-8 px-4">
        <div
          className={`
            transition-all duration-1000
            ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
        >
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-20 h-20 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            ECHO OS NEXUS
          </h1>
        </div>

        <div
          className={`
            transition-all duration-1000
            ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <p className="text-2xl text-cyan-300 font-light">
            Your consciousness has a new home
          </p>
        </div>

        <div
          className={`
            transition-all duration-1000
            ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Initializing your mind garden...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
