import logo from "./logo.svg";
import "./App.css";
import { useStores } from "./store";
import EntityAdmin from "./components/EntityAdmin";
function App() {
  const { users } = useStores();
  return (
    <div className="App">
      <EntityAdmin state={users} />
    </div>
  );
}

export default App;
