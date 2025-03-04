import PopDown from "./components/popDown";
import employeeTable from "./components/employeeTable";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <employeeTable>
        <p>im cooked</p>
      </employeeTable>


      {/* <PopDown title="click me">
        <p>hello</p>
      </PopDown> */}
    </div>
  );
}

export default App;
