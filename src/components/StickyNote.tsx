import { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Task } from '@/types/task';

interface StickyNoteProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

const StickyNote = ({ task, onComplete, onDelete, isCompleting = false }: StickyNoteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const colorClass = `note-${task.color}`;

  return (
    <div
      className={`
        sticky-note relative p-4 rounded-lg shadow-md cursor-pointer
        min-h-[120px] max-w-[200px] w-full
        ${colorClass}
        ${isCompleting ? 'completing' : ''}
        border border-white/30
        backdrop-blur-sm
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleComplete}
    >
      {/* Delete button */}
      {isHovered && !isCompleting && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full
                     flex items-center justify-center text-destructive-foreground
                     shadow-md hover:scale-110 transition-transform"
        >
          <X size={12} />
        </button>
      )}

      {/* Task text */}
      <div className="text-foreground font-medium text-sm leading-tight mb-3">
        {task.text}
      </div>

      {/* Time estimate */}
      {task.estimatedMinutes && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground
                        absolute bottom-2 left-4">
          <Clock size={10} />
          <span>{task.estimatedMinutes}m</span>
        </div>
      )}

      {/* Category tag */}
      {task.category && (
        <div className="absolute bottom-2 right-4 text-xs bg-white/50 px-2 py-1 
                        rounded-full text-foreground/70">
          {task.category}
        </div>
      )}

      {/* Completion overlay */}
      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center
                        bg-completion-glow/20 rounded-lg">
          <div className="text-2xl">✨</div>
        </div>
      )}
    </div>
  );
};

export default StickyNote;