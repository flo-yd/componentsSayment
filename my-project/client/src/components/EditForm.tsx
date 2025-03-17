import React, { useState } from "react";
import { EmployeeProps } from "../types/Props";
import InputField from "./inputField";
import Button from "./Button";

interface EditFormProps {
  employee: EmployeeProps;
  onSave: (id: number, updatedData: Partial<EmployeeProps>) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<EmployeeProps>>({
    firstName: employee.firstName,
    lastName: employee.lastName,
    groupName: employee.groupName,
    role: employee.role,
    expectedSalary: employee.expectedSalary,
    expectedDateOfDefense: employee.expectedDateOfDefense,
  });

  const handleChange = (field: keyof EmployeeProps, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="pr-4">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
      <InputField title="First Name" value={formData.firstName || ""} onChange={(e) => handleChange("firstName", e.target.value)} />
      <InputField title="Last Name" value={formData.lastName || ""} onChange={(e) => handleChange("lastName", e.target.value)} />
      <InputField title="Group Name" value={formData.groupName || ""} onChange={(e) => handleChange("groupName", e.target.value)} />
      <InputField title="Role" value={formData.role || ""} onChange={(e) => handleChange("role", e.target.value)} />
      <InputField title="Expected Salary" type="number" value={formData.expectedSalary?.toString() || ""} onChange={(e) => handleChange("expectedSalary", parseFloat(e.target.value))} />
      <InputField title="Expected Date of Defense" value={formData.expectedDateOfDefense || ""} onChange={(e) => handleChange("expectedDateOfDefense", e.target.value)} />
      <div className="flex justify-end gap-2 mt-4">
        <Button label="Save" onClick={() => onSave(employee.id, formData)} />
        <Button label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
};

export default EditForm;
