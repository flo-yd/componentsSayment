import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label?: string;
  children?: React.ReactNode;
}

export const EmployeeButton: React.FC<ButtonProps> = ({ onClick, children, label }) => {
  return (
    <button onClick={onClick}>
      {label}
      {children}
    </button>
  );
};

