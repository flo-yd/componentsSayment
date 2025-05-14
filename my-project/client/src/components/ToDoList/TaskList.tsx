import { useState } from 'react';
import { TaskSortingStrategy } from './TaskSortingStrategy';
import { Task } from './ToDo';
import { TaskFactory } from './TaskFactory';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export const TaskList = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sortMethod, setSortMethod] = useState<'date' | 'name' | 'id'>('date');
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskDeleted = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const sortedTasks = () => {
    switch (sortMethod) {
      case 'date':
        return TaskSortingStrategy.sortByDate(tasks);
      case 'name':
        return TaskSortingStrategy.sortByName(tasks);
      case 'id':
        return TaskSortingStrategy.sortById(tasks);
      default:
        return tasks;
    }
  };

  return (
    <div className='flex-wrap max-w-full overflow-x-hidden'>
      <div className="flex-wrap max-w-full flex justify-center mt-4">
        <div className="flex-wrap max-w-full flex items-center space-x-2">
          <h1 className="mr-2">Sort by:</h1>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-gray-100 min-w-24 flex items-center justify-between">
                <span>{sortMethod.charAt(0).toUpperCase() + sortMethod.slice(1)}</span>
                {isOpen ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56">
              <DropdownMenuLabel>Task Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setSortMethod("date")}>Date</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortMethod("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortMethod("id")}>id</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-2">
        {sortedTasks().map((task) => (
          <TaskFactory key={task.id} id={task.id}
              type={task.type} 
              title={task.title} 
              notes={task.notes}
              dueDate={task.dueDate}
              onDelete={handleTaskDeleted}/>
        ))
        }
      </div>
    </div>
  );
};