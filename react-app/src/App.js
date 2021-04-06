import "./App.css";
import stores from "./store";
import EntityAdmin from "./components/EntityAdmin";
function App() {
  const { users } = stores;
  return (
    <div className="App">
      <EntityAdmin state={users} />
    </div>
  );
}

export default App;
