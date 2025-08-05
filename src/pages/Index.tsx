import { useState } from 'react';
import { Sparkles, Target, Settings } from 'lucide-react';
import TaskCreator from '@/components/TaskCreator';
import StickyNotesBoard from '@/components/StickyNotesBoard';
import CompletionJar from '@/components/CompletionJar';
import { useTaskManager } from '@/hooks/useTaskManager';
import { Button } from '@/components/ui/button';

const Index = () => {
  const {
    tasks,
    completedTasks,
    streak,
    todayCount,
    weekCount,
    createTask,
    completeTask,
    deleteTask,
    clearAllTasks,
    clearCompletedTasks,
  } = useTaskManager();

  const [showSettings, setShowSettings] = useState(false);

  const handleJarShake = () => {
    // Play a satisfying sound effect (if implemented)
    // navigator.vibrate?.(100); // Haptic feedback on mobile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-primary" size={28} />
            <h1 className="text-3xl font-bold text-foreground">
              Sticky Notes
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Transform your tasks into satisfying wins. Create, complete, and watch your progress fill the jar! ✨
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-card px-3 py-1 rounded-full border border-border/50">
              📝 {tasks.length} active
            </div>
            <div className="bg-card px-3 py-1 rounded-full border border-border/50">
              🎯 {weekCount} this week
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Task Creation & Management */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Creator */}
            <section>
              <TaskCreator onCreateTask={createTask} />
            </section>

            {/* Active Tasks Board */}
            <section>
              <StickyNotesBoard
                tasks={tasks}
                onCompleteTask={completeTask}
                onDeleteTask={deleteTask}
                onClearCompleted={clearAllTasks}
              />
            </section>
          </div>

          {/* Right Column - Progress & Jar */}
          <div className="space-y-6">
            {/* Completion Jar */}
            <section className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
              <CompletionJar
                completedTasks={completedTasks}
                dailyCount={todayCount}
                streak={streak}
                onJarShake={handleJarShake}
              />
            </section>

            {/* Achievement Panel */}
            <section className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target size={18} />
                Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">First Task</span>
                  <span className={`text-xl ${completedTasks.length > 0 ? '' : 'grayscale opacity-50'}`}>
                    🎯
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">5 in a Day</span>
                  <span className={`text-xl ${todayCount >= 5 ? '' : 'grayscale opacity-50'}`}>
                    🔥
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Week Streak</span>
                  <span className={`text-xl ${streak >= 7 ? '' : 'grayscale opacity-50'}`}>
                    ⚡
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jar Master</span>
                  <span className={`text-xl ${completedTasks.length >= 50 ? '' : 'grayscale opacity-50'}`}>
                    👑
                  </span>
                </div>
              </div>
            </section>

            {/* Settings Panel */}
            <section className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Settings size={18} />
                  Settings
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompletedTasks}
                  className="w-full justify-start"
                  disabled={completedTasks.length === 0}
                >
                  Clear Completed Jar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllTasks}
                  className="w-full justify-start"
                  disabled={tasks.length === 0}
                >
                  Clear All Tasks
                </Button>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                  💾 Data saved automatically
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for productivity enthusiasts. Keep building momentum! 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
