"use client";
import { useEffect } from "react";
import ListComponent from "./TableList";
import EditForm from "./EditForm";
import Modal from "./Modal";
import useEmployees from "../helpers/Helpers";
import AddFormModal from "./AddFormModal";


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


    useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);


  return (
    <div>

      <AddFormModal onAddEmployee={handleAddEmployee}/>

      <ListComponent employees={employees} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleOpenEditModal} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedEmployee && (
          <EditForm
            employee={selectedEmployee}
            onSave={handleEditEmployee} 
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
