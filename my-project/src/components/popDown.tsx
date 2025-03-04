import React, { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

interface AccordionProps {
  title: string;
  toggleId: number; 
}

const PopDown: React.FC<AccordionProps> = ({ title, toggleId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopDown = async (newIsOpen: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/toggle/${toggleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOpen: newIsOpen }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the database');
      }

      const result = await response.json();
      console.log('Updated toggle:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    togglePopDown(newIsOpen); 
  };

  return (
    <div className="w-80 p-4 border rounded-lg shadow bg-white relative">
      <button
        className="w-full text-left font-bold p-2 bg-gray-200 rounded"
        onClick={handleToggle}
      >
        {title} {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-2 bg-white border rounded-lg shadow-lg text-center">
          {/* Add your content here */}
          <p>hello!</p>
        </div>
      )}
    </div>
  );
};

export default PopDown;