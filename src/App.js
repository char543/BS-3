import "./App.css";
import CanvasWrap from "./components/smoker3f";
import Spyro from "./components/Spyro.jsx";

function App() {
  return (
    <>
      <div className="App">
        <div className="h-screen w-screen absolute z-20 flex items-center justify-center">
          <Spyro className="relative z-20 flex items-center justify-center" />
        </div>
          <CanvasWrap className="z-0" />
      </div>
    </>
  );
}
export default App;
