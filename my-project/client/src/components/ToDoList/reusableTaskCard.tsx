import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Input } from "@/components/ui/input";
import { Task } from "./ToDo";
import { removeTask } from "@/helpers/TaskManager";
import React from "react";
import { useState } from "react";

interface BaseCardProps extends Task {
  onDelete?: (id: string) => void;
  children?: React.ReactNode;
}

export const BaseCard: React.FC<BaseCardProps> = ({ id, type, title, notes, onDelete, children}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTask(id);
      console.log(`Task with id ${id} deleted successfully.`);

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error(`Failed to delete task with id ${id}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-200 mt-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-row items-center relative">
      {type === "checklist" && (
        <div className="pl-4">
          <Input type="checkbox" className="h-4 w-4" />
        </div>
      )}
      <CardHeader className="flex-shrink-0 min-w-[150px] py-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow py-3 px-4 overflow-hidden">
        {notes} 
        {children}
      </CardContent>
      <CardFooter className="flex-shrink-0 py-3 pr-4 pl-0 relative">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm rounded hover:bg-blue-100 bg-blue-300" onClick={() => {}}>
            Edit
          </button>
          <button
            className={`px-3 py-1 text-sm rounded transition-colors ${
              isDeleting ? "bg-gray-300 cursor-not-allowed" : "hover:bg-pink-100 bg-pink-300"
            }`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          
        </div>
      </CardFooter>
    </Card>
  );
};