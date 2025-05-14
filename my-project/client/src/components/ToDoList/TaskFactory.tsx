import { BaseCard } from "./reusableTaskCard";
import { Task } from "./ToDo";

export const TaskComponent: React.FC<Task> = ({ id, type, title, notes, dueDate, onDelete }) => {

  switch (type) {
    case 'basic':
      return (
      <BaseCard  title={title} notes={notes} type={type} id={id} onDelete={onDelete}>
      </BaseCard>
      )

    case 'timed':
      return (
        <BaseCard title={title} type={type} notes = {notes} id={id} onDelete={onDelete}>
          {dueDate && <div>Due Date: {new Date(dueDate).toLocaleDateString()}</div>}
        </BaseCard>
      );

    case 'checklist':
      return (
          <BaseCard type={type} title={title} notes={notes} id={id} onDelete={onDelete}>
          </BaseCard>
      );

    default:
      return null; 
  }
};

export const TaskFactory = (props: Task) => (
  <TaskComponent {...props} />
);