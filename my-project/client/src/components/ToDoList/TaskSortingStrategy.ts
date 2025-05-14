import { Task } from "./ToDo"; // Your Task type interface

interface SortingStrategy {
  sort(tasks: Task[]): Task[];
}

export class TaskSortingStrategy {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  public sort(tasks: Task[]): Task[] {
    return this.strategy.sort(tasks);
  }

  public static sortByDate(tasks: Task[]): Task[] {
    return new TaskSortingStrategy(new SortByDateStrategy()).sort(tasks);
  }

  public static sortByName(tasks: Task[]): Task[] {
    return new TaskSortingStrategy(new SortByNameStrategy()).sort(tasks);
  }

  public static sortById(tasks: Task[]): Task[] {
    return new TaskSortingStrategy(new SortByIdStrategy()).sort(tasks);
  }
}

class SortByDateStrategy implements SortingStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return (a.dueDate instanceof Date ? a.dueDate.getTime() : new Date(a.dueDate).getTime()) -
             (b.dueDate instanceof Date ? b.dueDate.getTime() : new Date(b.dueDate).getTime());
    });
  }
}

class SortByNameStrategy implements SortingStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }
}

class SortByIdStrategy implements SortingStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.id.localeCompare(b.id));
  }
}