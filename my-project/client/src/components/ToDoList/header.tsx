import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useState } from "react";
import { addTask } from "@/helpers/TaskManager";

type TaskType = 'basic' | 'timed' | 'checklist';

interface HeaderProps {
  onTaskAdded?: () => void; 
}

export const Header: React.FC<HeaderProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<TaskType>('basic');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (title.trim() === "") {
      alert("Please enter a title")
      return
    }

    setIsLoading(true)

    try {
      const task = {
        title,
        type: selectedType,
        notes,
        dueDate,
      }

      await addTask(task)

      // Clear form fields after successful addition
      setTitle("")
      setNotes("")
      setDueDate(undefined)

      // Call the callback to refresh the task list
      if (onTaskAdded) {
        onTaskAdded()
      }
    } catch (error) {
      console.error("Failed to add task:", error)
      alert("Failed to add task. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-blue-50 py-6 px-4 shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full md:w-40 bg-white" 
          />
          <Input 
            type="text" 
            placeholder="Notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}  
            className="w-full md:w-60 bg-white" 
          />
          <Input 
            type="date" 
            value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''} 
            onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)} 
            className="w-full md:w-40 bg-white" 
          />
          
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-white w-full md:w-auto">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} {isOpen ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Task Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setSelectedType("basic")}>Basic</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedType("timed")}>Timed</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedType("checklist")}>Checklist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="default" 
            onClick={handleAddTask}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </div>
    </div>
  );
};