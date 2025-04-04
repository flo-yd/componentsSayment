import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500/50 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative border border-gray-200">
        <button className="rounded-full w-4 h-8 flex items-center justify-center hover:bg-gray-400 absolute top-2 right-2 !border-none outline-none [&>svg]:border-none" 
        onClick={onClose}>
          <FontAwesomeIcon icon={faX} size="xs" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
