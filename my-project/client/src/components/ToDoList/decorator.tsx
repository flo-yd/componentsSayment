import { Bell } from "lucide-react";

interface ReminderDecoratorProps {
  dueDate?: Date | string;
  className?: string;
}

export const ReminderDecorator = ({ dueDate, className = '' }: ReminderDecoratorProps) => {
  if (!dueDate) return null;

  return (
    <div className={`mr-2 ${className}`}>
      <div className="relative">
        <Bell className="text-yellow-500 w-5 h-5" />
        <span className="absolute -top-1 -right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
      </div>
    </div>
  );
};