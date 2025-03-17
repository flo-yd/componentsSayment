"use client";

import React, { useEffect, useState } from "react";
import AddForm from "./addForm";
import ListComponent from "./listComponent";
import EditForm from "./EditForm";
import Modal from "./modal";
import { EmployeeProps } from "../types/Props";

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProps | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleAddEmployee = (newEmployee: Omit<EmployeeProps, "id">) => {
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEmployee, id: employees.length + 1 }),
    })
      .then((response) => response.json())
      .then((data) => setEmployees([...employees, data]))
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleOpenEditModal = (employee: EmployeeProps) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (id: number, updatedEmployee: Partial<EmployeeProps>) => {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(employees.map((employee) => (employee.id === id ? { ...employee, ...data } : employee)));
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error editing employee:", error));
  };


  const handleDeleteEmployee = (id: number) => {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    })
      .then(() => setEmployees(employees.filter((employee) => employee.id !== id)))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div>
      <AddForm onAddEmployee={handleAddEmployee} />
      <ListComponent employees={employees} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleOpenEditModal} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedEmployee && <EditForm employee={selectedEmployee} onSave={handleEditEmployee} onCancel={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
