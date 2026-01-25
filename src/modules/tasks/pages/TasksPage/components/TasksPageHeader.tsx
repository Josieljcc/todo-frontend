import { Button } from '@/components/ui/button';

interface TasksPageHeaderProps {
  username?: string;
  onAddTask: () => void;
  isLoading: boolean;
}

export const TasksPageHeader = ({ username, onAddTask, isLoading }: TasksPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Hello{username ? `, ${username}` : ''}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's what you need to focus on today</p>
      </div>
      <Button onClick={onAddTask} disabled={isLoading} className="hidden md:flex">
        Add Task
      </Button>
      {/* Mobile: Button handled by BottomNavigation */}
    </div>
  );
};
