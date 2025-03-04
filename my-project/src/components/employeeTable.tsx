interface EmployeeProps {
  employeeName: string;
  salary: number;
  role: string;
  id: number;
}


const employeeData = ((data: EmployeeProps)=>{
  (
  employeeName: "John Doe",
  salary: 60000,
  role: 'developer',
  id: 1234,
  )

  
}
)

const employeeTable: React.FC = () => {

  const handleEmployeeFilter = (employeeData) => {
      employeeData.
    }
  

  return (
    <div className="container">
      <h1>Employees</h1>
      <employeeData data = {[
        (employeeName = "johndoe",
         salary = 60000
        )

        (
          employeeName = "safjas",
          salary = 28347983
        )
      ]}></employeeData>
        <ul>

        </ul>
    </div>
  )
}

export default employeeTable