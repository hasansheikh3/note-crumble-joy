import { useState } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import StickyNote from './StickyNote';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';

interface StickyNotesBoardProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted: () => void;
}

const StickyNotesBoard = ({ 
  tasks, 
  onCompleteTask, 
  onDeleteTask, 
  onClearCompleted 
}: StickyNotesBoardProps) => {
  const [completingTasks, setCompletingTasks] = useState<Set<string>>(new Set());

  const handleCompleteTask = (id: string) => {
    // Add visual feedback before actual completion
    setCompletingTasks(prev => new Set(prev.add(id)));
    
    // Delay the actual completion to allow animation
    setTimeout(() => {
      onCompleteTask(id);
      setCompletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 800); // Match crumple animation duration
  };

  const activeTasks = tasks.filter(task => !task.isCompleted);
  const hasTasks = activeTasks.length > 0;

  if (!hasTasks) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl opacity-30">📝</div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-muted-foreground">
            No active tasks
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Create your first sticky note to start building momentum!
          </p>
        </div>
      </div>
    );
  }

  // Group tasks by category for better organization
  const groupedTasks = activeTasks.reduce((groups, task) => {
    const category = task.category || 'general';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  const categories = Object.keys(groupedTasks).sort();

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Active Tasks ({activeTasks.length})
        </h2>
        {activeTasks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="flex items-center gap-2"
          >
            <RotateCcw size={14} />
            Clear All
          </Button>
        )}
      </div>

      {/* Tasks Grid */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-3">
            {/* Category Header */}
            {categories.length > 1 && (
              <h3 className="text-sm font-medium text-muted-foreground capitalize
                           border-b border-border/30 pb-1">
                {category === 'general' ? 'Other Tasks' : category}
              </h3>
            )}
            
            {/* Tasks Grid for Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                            gap-4 auto-rows-fr">
              {groupedTasks[category].map(task => (
                <StickyNote
                  key={task.id}
                  task={task}
                  onComplete={handleCompleteTask}
                  onDelete={onDeleteTask}
                  isCompleting={completingTasks.has(task.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      {activeTasks.length < 3 && (
        <div className="mt-8 p-4 bg-accent/20 rounded-lg border border-accent/30">
          <div className="flex items-start gap-3">
            <div className="text-xl">💡</div>
            <div>
              <h4 className="font-medium text-accent-foreground mb-1">
                Productivity Tip
              </h4>
              <p className="text-sm text-accent-foreground/80">
                Break big tasks into 2-5 minute micro-tasks. Small wins build momentum 
                and create satisfying completion moments!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNotesBoard;