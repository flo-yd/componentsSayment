import { BaseCard } from "./reusableTaskCard";
import { Task } from "./ToDo";
import { ReminderDecorator } from "./decorator";


const formatDateTime = (dateTime: string | Date | undefined) => {
  if (!dateTime) return null;

  try {
    const date = new Date(dateTime);

    // Check if date is valid
    if (isNaN(date.getTime())) return null;

    // Format date and time with options for Philippine time (or any local timezone)
    const dateOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'Asia/Manila' // Philippine timezone
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
      timeZone: 'Asia/Manila' // Philippine timezone
    };

    return {
      date: date.toLocaleDateString('en-PH', dateOptions),
      time: date.toLocaleTimeString('en-PH', timeOptions),
      full: `${date.toLocaleDateString('en-PH', dateOptions)} at ${date.toLocaleTimeString('en-PH', timeOptions)}`,
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

export const TaskComponent: React.FC<Task> = ({ id, type, title, notes, dueDate, onDelete }) => {
  const formattedDateTime = formatDateTime(dueDate);

  switch (type) {
    case 'basic':
      return (
        <BaseCard title={title} notes={notes} type={type} id={id} onDelete={onDelete}>
        </BaseCard>
      );

    case 'timed':
      return (
        <BaseCard title={title} type={type} notes={notes} id={id} onDelete={onDelete}>
          <div className="mt-2 text-sm text-blue-600">
            <span className="font-medium">Due: </span>
            {formattedDateTime ? formattedDateTime.full : "No due date"}
          </div>
          <ReminderDecorator dueDate={dueDate} className="absolute top-1 right-0"/>
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