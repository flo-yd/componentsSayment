"use client";
import { useEffect } from "react";
import AddForm from "./addForm";
import ListComponent from "./listComponent";
import EditForm from "./EditForm";
import Modal from "./modal";
import useEmployees from "../helpers/Helpers";

const EmployeeTable: React.FC = () => {
  const {
    employees,
    fetchEmployees,
    handleAddEmployee,
    handleDeleteEmployee,
    handleOpenEditModal,
    handleEditEmployee, 
    isModalOpen,
    setIsModalOpen,
    selectedEmployee,
  } = useEmployees();

  // Ensure fetchEmployees only runs on mount
    useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div>
      <AddForm onAddEmployee={handleAddEmployee} />
      <ListComponent employees={employees} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleOpenEditModal} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedEmployee && (
          <EditForm
            employee={selectedEmployee}
            onSave={handleEditEmployee} // Pass the correct function
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
