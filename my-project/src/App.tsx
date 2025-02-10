import PopDown from "./components/popDown";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <PopDown title="click me">
        <p>hello</p>
      </PopDown>
    </div>
  );
}

export default App;
