interface EmployeeProps {
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  expectedDateOfDefense: string;
  id: number;
}

interface ListComponentProps {
  employees: EmployeeProps[];
  onDeleteEmployee: (id: number) => void;
  onEditEmployee: (employee: EmployeeProps) => void;
}

interface InputFieldProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: string;
  expectedDateOfDefense: string;
}

interface EmployeeFormProps {
  onAddEmployee: (employee: {
    firstName: string;
    lastName: string;
    groupName: string;
    role: string;
    expectedSalary: number;
    expectedDateOfDefense: string;
  }) => void;
}

export type { EmployeeProps, ListComponentProps, InputFieldProps, EmployeeFormData, EmployeeFormProps };