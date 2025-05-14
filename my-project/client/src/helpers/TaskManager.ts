import { toast } from "react-toastify";

export type TaskType = 'basic' | 'timed' | 'checklist';

export interface TaskProps {
  type: TaskType;
  title: string;
  notes?: string;
  dueDate?: string; 
}

export const fetchTasks = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/tasks');
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export const addTask = async (task: TaskProps) => {
  try {
    // For timed tasks, ensure dueDate is properly formatted when sending to the server
    const taskToSend = {
      ...task,
      // If dueDate exists, convert it properly accounting for timezone
      dueDate: task.dueDate ? convertLocalToUTC(task.dueDate) : undefined
    };

    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToSend),
    });
    toast.success("Task added successfully", {
      position: "top-right",
    });
    
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

// Helper function to convert local datetime-local input to UTC
function convertLocalToUTC(localDateTimeString: string): string {
  // Create a date object from the local datetime string
  const date = new Date(localDateTimeString);
  
  // Return the date in ISO format, which will include timezone info
  return date.toISOString();
}

export const removeTask = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    });
    toast.success("Task deleted successfully", {
      position: "top-right",});

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}