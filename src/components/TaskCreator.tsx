import { useState } from 'react';
import { Plus, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NOTE_COLORS, PRESET_TASKS, Task } from '@/types/task';

interface TaskCreatorProps {
  onCreateTask: (task: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => void;
}

const TaskCreator = ({ onCreateTask }: TaskCreatorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState<Task['color']>('butter');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | undefined>();
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onCreateTask({
        text: text.trim(),
        color: selectedColor,
        estimatedMinutes,
        category: category.trim() || undefined,
      });
      setText('');
      setEstimatedMinutes(undefined);
      setCategory('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setEstimatedMinutes(undefined);
    setCategory('');
    setIsCreating(false);
  };

  const handlePresetTask = (preset: { text: string; category: string; estimatedMinutes: number }) => {
    onCreateTask({
      text: preset.text,
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)].name,
      estimatedMinutes: preset.estimatedMinutes,
      category: preset.category,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isCreating) {
    return (
      <div className="space-y-6">
        {/* Quick Create Button */}
        <Button
          onClick={() => setIsCreating(true)}
          className="w-full h-24 text-lg font-medium bg-primary hover:bg-primary/90
                     flex flex-col items-center justify-center gap-2
                     rounded-xl shadow-lg hover:shadow-xl transition-all
                     border-2 border-primary/20"
        >
          <Plus size={24} />
          Create New Task
        </Button>

        {/* Preset Tasks */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Quick Morning Tasks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_TASKS.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handlePresetTask(preset)}
                className="h-auto p-3 justify-start text-left hover:bg-accent/50
                           border border-border/50 rounded-lg"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{preset.text}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock size={10} />
                    <span>{preset.estimatedMinutes}m</span>
                    <Tag size={10} />
                    <span>{preset.category}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Text Input */}
        <div>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done? (keep it short!)"
            maxLength={80}
            autoFocus
            className="text-base h-12 border-2 border-primary/20 focus:border-primary"
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {text.length}/80 characters
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Choose Color
          </label>
          <div className="flex flex-wrap gap-2">
            {NOTE_COLORS.map(({ name, label }) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedColor(name)}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  note-${name}
                  ${selectedColor === name 
                    ? 'border-primary scale-110 shadow-lg' 
                    : 'border-white/50 hover:scale-105'
                  }
                `}
                title={label}
              />
            ))}
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Minutes
            </label>
            <Input
              type="number"
              value={estimatedMinutes || ''}
              onChange={(e) => setEstimatedMinutes(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="5"
              min="1"
              max="60"
              className="h-10"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Category
            </label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="work, home..."
              maxLength={20}
              className="h-10"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={!text.trim()}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Create Task
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreator;