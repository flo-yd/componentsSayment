import React from "react";
import Button from "./Button";
import {  ListComponentProps } from "../types/Props";


const ListComponent: React.FC<ListComponentProps> = ({ employees, onDeleteEmployee, onEditEmployee }) => {
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <li key={employee.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </span>
                  <span className="text-sm text-gray-500">Group: {employee.groupName}</span>
                  <span className="text-sm text-gray-500 ml-2">Role: {employee.role}</span>
                  <span className="text-sm text-gray-500">Salary: ${employee.expectedSalary}</span>
                  <span className="text-sm text-gray-500 ml-2">Defense: {employee.expectedDateOfDefense}</span>
              <Button label="Delete" onClick={() => onDeleteEmployee(employee.id)} />
              <Button label="Edit" onClick={() => onEditEmployee(employee)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListComponent;