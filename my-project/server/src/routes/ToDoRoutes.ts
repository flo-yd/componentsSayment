import { prisma } from '../server';
import { Request, Response } from 'express';


export const getToDoList = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export async function addTask(req: Request, res: Response): Promise<void> {
  const { type, title, dueDate, notes } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        type,
        title,
        dueDate,
        notes,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
}


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    if (!id) {
      res.status(400).json({ error: "Task ID is required" })
      return
    }

    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    })
    res.status(200).json({ message: "Task deleted successfully", task })
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ error: "Failed to delete task" })
  }
}
