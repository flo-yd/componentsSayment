import React, { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";


interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const PopDown: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-80 p-4 border rounded-lg shadow bg-white relative">
      <button
        className="w-full text-left font-bold p-2 bg-gray-200 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? <HiChevronUp/> : <HiChevronDown/>}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-2 bg-white border rounded-lg shadow-lg text-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default PopDown;