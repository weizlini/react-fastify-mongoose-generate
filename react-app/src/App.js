import "./App.css";
import stores, { useStores } from "./store";
import EntityAdmin from "./components/EntityAdmin";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0277bd",
    },
    secondary: {
      main: "#ffc400",
    },
  },
});
console.dir(theme);

function App() {
  const { users } = useStores();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>React App is running !</p>
        <EntityAdmin state={users} />
      </div>
    </ThemeProvider>
  );
}

export default App;
