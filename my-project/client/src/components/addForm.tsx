import React, { useState } from "react";
import InputField from "./inputField";
import Button from "./Button";
import { EmployeeFormData, EmployeeFormProps } from "../types/Props";


const AddForm: React.FC<EmployeeFormProps> = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: "",
    expectedDateOfDefense: "",
  });


  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };


  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.groupName ||
      !formData.role ||
      !formData.expectedSalary ||
      !formData.expectedDateOfDefense
    ) {
      alert("All fields are required");
      return;
    }

    const newEmployee = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      groupName: formData.groupName,
      role: formData.role,
      expectedSalary: Number.parseFloat(formData.expectedSalary) || 0, 
      expectedDateOfDefense: formData.expectedDateOfDefense,
    };


    onAddEmployee(newEmployee);


    setFormData({
      firstName: "",
      lastName: "",
      groupName: "",
      role: "",
      expectedSalary: "",
      expectedDateOfDefense: "",
    });
  };

  return (
    <div className="bg-gray-100 p-5 pr-10 rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 ">
        <InputField
          title="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        <InputField
          title="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
        <InputField
          title="Group Name"
          value={formData.groupName}
          onChange={(e) => handleInputChange("groupName", e.target.value)}
        />
        <InputField
          title="Role"
          value={formData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
        />
        <InputField
          title="Expected Salary"
          type="number"
          value={formData.expectedSalary}
          onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
        />
        <InputField
          title="Expected Date of Defense"
          value={formData.expectedDateOfDefense}
          onChange={(e) => handleInputChange("expectedDateOfDefense", e.target.value)}
        />
      </div>
      <Button label="Add Employee" onClick={handleSubmit} />
    </div>
  );
};

export default AddForm;