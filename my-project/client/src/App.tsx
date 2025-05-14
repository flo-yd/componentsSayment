import './index.css'
// import EmployeeTable from "./components/EmployeeManagement";
import { ToDo } from './components/ToDoList/ToDo';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center min-w-screen">
      {/* <EmployeeTable>
      </EmployeeTable> */}
      <ToDo/>
    </div>
  );
}

export default App;
