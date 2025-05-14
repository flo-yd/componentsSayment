import { TaskComponentProps } from "./TaskFactory";
interface Task extends TaskComponentProps{
  id: number;
}

export const tasks: Task[] = [
  { id: 1, title: "basic", type: "basic", notes: "This is a basic task" },
  { id: 2, title: "timed", type: "timed", dueDate: new Date("2024-03-01"), notes: "This is a timed task" },
  { id: 3, title: "checklist", type: "checklist" },
];
