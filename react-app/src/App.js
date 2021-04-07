import "./App.css";
import stores from "./store";
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
  const { users } = stores;
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <EntityAdmin state={users} />
      </div>
    </ThemeProvider>
  );
}

export default App;
