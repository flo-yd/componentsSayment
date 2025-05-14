import { Header } from "./header";
import { useEffect, useState } from "react";
import { fetchTasks } from "@/helpers/TaskManager";
import { useCallback } from "react";
import { TaskList } from "./TaskList";
import { toast } from "react-toastify";


export type TaskType = 'basic' | 'timed' | 'checklist';
export interface Task {
    id: string;
    type: TaskType;
    title: string;
    notes?: string;
    dueDate?: Date | string;
    onDelete?: (id: string) => void;
  }
  
export const ToDo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    setLoading(true)
    try {
      const fetchedTasks = await fetchTasks()
      setTasks(fetchedTasks)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleTaskAdded = () => {
    loadTasks()
  }

  useEffect(() => {
    const now = new Date();

    tasks.forEach((task) => {
      if (task.dueDate) {
        const due = new Date(task.dueDate);
        if (due < now) {
          toast.warn(`Task "${task.title}" is overdue!`, {
            toastId: `overdue-${task.id}`, // prevent duplicate toasts
          });
        }
      }
    });
  }, [tasks]);

  return (
    <div className="min-h-screen flex-wrap max-w-[60vw]">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header onTaskAdded={handleTaskAdded}/>
      </div>
      
      <div className="pt-20">
        {loading ? (
          <div className="flex items-center justify-center h-[85vh]">
            <h1 className="text-2xl font-bold">Loading tasks...</h1>
          </div>
        ) : tasks.length > 0 ? (
          <TaskList initialTasks={tasks}/>
        ) : (
          <div className="flex items-center justify-center h-[85vh]">
            <h1 className="text-2xl font-bold">No tasks available</h1>
          </div>
        )}
      </div>
    </div>
  );
};