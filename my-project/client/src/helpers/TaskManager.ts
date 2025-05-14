export type TaskType = 'basic' | 'timed' | 'checklist';

export interface TaskProps {
  type: TaskType;
  title: string;
  notes?: string;
  dueDate?: Date; 
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
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
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

export const removeTask = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      throw new Error("Failed to delete task")
    }

    return await res.json()
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}