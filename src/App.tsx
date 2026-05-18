import { enableArrayMethods, enableMapSet } from "immer";
import "./App.css";
import { Main } from "./components/Main";
import { GameProvider } from "./game/state/provider";

enableMapSet();
enableArrayMethods();

const App = () => {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
};

export default App;
