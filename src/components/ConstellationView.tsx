import React, { useEffect, useRef } from 'react';
import { Memory, MemoryConnection } from '../types';

interface ConstellationViewProps {
  memories: Memory[];
  connections: MemoryConnection[];
  onMemoryClick?: (memory: Memory) => void;
}

export function ConstellationView({ memories, connections, onMemoryClick }: ConstellationViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const positions = new Map<string, { x: number; y: number; vx: number; vy: number }>();
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    memories.forEach((memory) => {
      positions.set(memory.id, {
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    });

    let pulsePhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      pulsePhase += 0.02;

      connections.forEach((connection) => {
        const from = positions.get(connection.fromMemoryId);
        const to = positions.get(connection.toMemoryId);

        if (from && to) {
          const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
          gradient.addColorStop(0, `rgba(0, 255, 255, ${0.2 + Math.sin(pulsePhase) * 0.1})`);
          gradient.addColorStop(1, `rgba(147, 51, 234, ${0.2 + Math.sin(pulsePhase + 1) * 0.1})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = connection.strength / 5;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      });

      memories.forEach((memory) => {
        const pos = positions.get(memory.id);
        if (!pos) return;

        pos.x += pos.vx;
        pos.y += pos.vy;

        if (pos.x < 20 || pos.x > width - 20) pos.vx *= -1;
        if (pos.y < 20 || pos.y > height - 20) pos.vy *= -1;

        const emotionColors: Record<string, string> = {
          joy: '#FFD700',
          curiosity: '#00FFFF',
          frustration: '#FF6B6B',
          breakthrough: '#FF00FF',
          reflection: '#9333EA'
        };

        const color = emotionColors[memory.emotionalTag] || '#00FFFF';
        const size = 4 + memory.importance * 2;
        const pulse = Math.sin(pulsePhase + memory.id.charCodeAt(0)) * 0.3 + 1;

        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * pulse * 2);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, `${color}80`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * pulse * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [memories, connections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
