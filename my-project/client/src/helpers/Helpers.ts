import { useEffect, useState } from "react";
import { EmployeeProps } from "../types/Props";

const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProps | null>(null);

  const fetchEmployees = () => {
    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = (newEmployee: Omit<EmployeeProps, "id">) => {
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEmployee, id: employees.length + 1 , expectedSalary: newEmployee.expectedSalary || 0}),
    })
      .then((response) => response.json())
      .then((data) => setEmployees([...employees, data]))
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleOpenEditModal = (employee: EmployeeProps) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id: number) => {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    })
      .then(() => setEmployees(employees.filter((employee) => employee.id !== id)))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (id: number, updatedEmployee: Partial<EmployeeProps>) => {
    fetch(`http://localhost:3000/employees`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id, 
        ...updatedEmployee,
        expectedSalary: updatedEmployee.expectedSalary ?? 0
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(employees.map((employee) => (employee.id === id ? { ...employee, ...data } : employee)));
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error editing employee:", error));
  };

  return {
    employees,
    isModalOpen,
    setIsModalOpen,
    selectedEmployee,
    handleAddEmployee,
    handleOpenEditModal,
    handleDeleteEmployee,
    handleCloseModal,
    fetchEmployees,
    handleEditEmployee,
  };
};

export default useEmployees;