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
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Task Creation & Management */}
          <div className="lg:col-span-3 space-y-8">
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
          <div className="lg:col-span-2 space-y-6">
            {/* Completion Jar */}
            <section>
              <CompletionJar
                completedTasks={completedTasks}
                dailyCount={todayCount}
                streak={streak}
                onJarShake={handleJarShake}
              />
            </section>

            {/* Settings Menu */}
            <details className="bg-card rounded-xl border border-border/50 shadow-lg">
              <summary className="p-4 cursor-pointer hover:bg-accent/50 rounded-xl flex items-center gap-2">
                <Settings size={18} />
                <span className="font-medium">Settings & Achievements</span>
              </summary>
              <div className="p-4 pt-0 space-y-4">
                {/* Achievement Panel */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Target size={16} />
                    Achievements
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex flex-col items-center p-2 bg-accent/20 rounded">
                      <span className={`text-lg ${completedTasks.length > 0 ? '' : 'grayscale opacity-50'}`}>🎯</span>
                      <span className="text-muted-foreground">First Task</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-accent/20 rounded">
                      <span className={`text-lg ${todayCount >= 5 ? '' : 'grayscale opacity-50'}`}>🔥</span>
                      <span className="text-muted-foreground">5 in a Day</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-accent/20 rounded">
                      <span className={`text-lg ${streak >= 7 ? '' : 'grayscale opacity-50'}`}>⚡</span>
                      <span className="text-muted-foreground">Week Streak</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-accent/20 rounded">
                      <span className={`text-lg ${completedTasks.length >= 50 ? '' : 'grayscale opacity-50'}`}>👑</span>
                      <span className="text-muted-foreground">Jar Master</span>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Actions</h4>
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
              </div>
            </details>
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
