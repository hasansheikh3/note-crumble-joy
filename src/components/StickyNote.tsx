import { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import Draggable from 'react-draggable';

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

  return (
    <Draggable handle=".drag-handle">
      <div 
        className={`
          sticky-note p-4 rounded-lg shadow-md border border-border/20
          min-h-[120px] flex flex-col justify-between
          cursor-pointer hover:shadow-lg transition-all duration-200
          ${isCompleting ? 'completing' : ''}
        `}
        style={{
          backgroundColor: `hsl(var(--${task.color.replace('-', '-')}))`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header with drag handle and delete */}
        <div className="flex items-start justify-between mb-2 -mt-1">
          <div 
            className="drag-handle cursor-move p-1 rounded opacity-0 hover:opacity-100 transition-opacity"
            title="Drag to move"
          >
            <div className="w-4 h-3 flex flex-col justify-center gap-0.5">
              <div className="w-full h-0.5 bg-foreground/40 rounded"></div>
              <div className="w-full h-0.5 bg-foreground/40 rounded"></div>
              <div className="w-full h-0.5 bg-foreground/40 rounded"></div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 hover:bg-destructive/20 opacity-60 hover:opacity-100"
          >
            <X size={12} />
          </Button>
        </div>

        {/* Task Content */}
        <div className="flex-1 mb-3" onClick={handleComplete}>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {task.text}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Time estimate */}
          {task.estimatedMinutes && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={10} />
              <span>{task.estimatedMinutes}m</span>
            </div>
          )}

          {/* Category */}
          {task.category && (
            <span className="text-xs px-2 py-1 bg-background/50 rounded-full text-muted-foreground">
              {task.category}
            </span>
          )}

          {/* Complete button */}
          <Button
            onClick={handleComplete}
            disabled={isCompleting}
            size="sm"
            className="ml-auto bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground
                       border border-primary/30 h-7 px-3 text-xs font-medium"
          >
            {isCompleting ? '✓' : 'Done'}
          </Button>
        </div>

        {/* Completion overlay */}
        {isCompleting && (
          <div className="absolute inset-0 flex items-center justify-center
                          bg-completion-glow/20 rounded-lg">
            <div className="text-2xl">✨</div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default StickyNote;