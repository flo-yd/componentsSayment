import { TaskFactory } from "./TaskFactory";
import { Header } from "./header";
import { useEffect, useState } from "react";
import { fetchTasks } from "@/helpers/TaskManager";
import { useCallback } from "react";

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

  const handleTaskDeleted = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }


  const handleTaskAdded = () => {
    loadTasks()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Loading tasks...</h1>
    </div>;
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header onTaskAdded={handleTaskAdded}/>
      </div>
      
      <div className="pt-20">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id}>
              <TaskFactory 
              id={task.id}
              type={task.type} 
              title={task.title} 
              notes={task.notes}
              dueDate={task.dueDate}
              onDelete={handleTaskDeleted}
              />     
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[85vh]">
            <h1 className="text-2xl font-bold">No tasks available</h1>
          </div>
        )}
      </div>
    </div>
  );
};