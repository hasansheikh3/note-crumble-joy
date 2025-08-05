import { useEffect, useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { CompletedTask } from '@/types/task';

interface CompletionJarProps {
  completedTasks: CompletedTask[];
  dailyCount: number;
  streak: number;
  onJarShake?: () => void;
}

const CompletionJar = ({ completedTasks, dailyCount, streak, onJarShake }: CompletionJarProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (dailyCount > 0 && dailyCount % 5 === 0) {
      setIsShaking(true);
      setShowBurst(true);
      onJarShake?.();
      
      const shakeTimer = setTimeout(() => setIsShaking(false), 400);
      const burstTimer = setTimeout(() => setShowBurst(false), 600);
      
      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(burstTimer);
      };
    }
  }, [dailyCount, onJarShake]);

  const generateJarBalls = () => {
    return completedTasks.slice(-50).map((task, index) => {
      // Calculate position based on jar filling
      const layer = Math.floor(index / 10);
      const positionInLayer = index % 10;
      const x = 10 + (positionInLayer * 8) + Math.random() * 10;
      const y = 85 - (layer * 12) - Math.random() * 5;
      
      return (
        <div
          key={task.id}
          className={`
            jar-ball absolute w-3 h-3 note-${task.color}
            bounce-in
          `}
          style={{
            left: `${x}%`,
            bottom: `${y > 10 ? y : 10}%`,
            animationDelay: `${index * 0.05}s`,
          }}
        />
      );
    });
  };

  const getJarFillPercentage = () => {
    return Math.min((completedTasks.length / 50) * 100, 100);
  };

  const getEncouragementMessage = () => {
    if (dailyCount === 0) return "Start your productive day! 🌟";
    if (dailyCount < 3) return "Great start! Keep going! 💪";
    if (dailyCount < 5) return "You're on fire! 🔥";
    if (dailyCount < 10) return "Productivity master! ⚡";
    return "Absolutely crushing it! 🚀";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Stats Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1 text-sm font-medium text-accent-foreground
                          bg-accent px-3 py-1 rounded-full">
            <Sparkles size={14} />
            <span>Today: {dailyCount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary-foreground
                          bg-primary px-3 py-1 rounded-full">
            <Trophy size={14} />
            <span>Streak: {streak}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          {getEncouragementMessage()}
        </p>
      </div>

      {/* Completion Jar */}
      <div className="relative">
        {/* Jar Container */}
        <div 
          className={`
            completion-jar relative w-24 h-32 mx-auto
            ${isShaking ? 'jar-shake' : ''}
          `}
          style={{
            background: `linear-gradient(to top, 
              hsl(var(--jar-glass)) 0%, 
              hsl(var(--jar-highlight)) 100%)`,
          }}
        >
          {/* Jar Rim */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2
                          w-20 h-2 bg-border rounded-full shadow-sm" />
          
          {/* Fill Level Indicator */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-completion-glow/10 
                       transition-all duration-1000 ease-out rounded-b-2xl"
            style={{ height: `${getJarFillPercentage()}%` }}
          />

          {/* Completed Task Balls */}
          {generateJarBalls()}

          {/* Jar Highlights */}
          <div className="absolute top-2 left-2 w-2 h-6 bg-white/40 rounded-full opacity-60" />
          <div className="absolute top-4 right-3 w-1 h-4 bg-white/30 rounded-full opacity-40" />
        </div>

        {/* Completion Burst Effect */}
        {showBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="completion-burst text-4xl">✨</div>
          </div>
        )}

        {/* Overflow Indicator */}
        {completedTasks.length >= 50 && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2
                          text-xs text-completion-glow font-medium pulse-glow">
            Jar Full! 🎉
          </div>
        )}
      </div>

      {/* Jar Stats */}
      <div className="text-center text-xs text-muted-foreground">
        <div>Total Completed: {completedTasks.length}</div>
        <div className="w-16 bg-muted rounded-full h-1 mt-1">
          <div 
            className="bg-completion-glow h-1 rounded-full transition-all duration-500"
            style={{ width: `${getJarFillPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletionJar;