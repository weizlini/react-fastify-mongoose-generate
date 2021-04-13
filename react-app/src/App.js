import "./App.css";
import stores, { useStores } from "./store";
import EntityAdmin from "./components/EntityAdmin";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

/**
 * use this to customise the MUI theme
 * @type {Theme}
 */
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006600",
    },
    secondary: {
      main: "#ffc400",
    },
  },
});
console.dir(theme);

function App() {
  /**
   * useStores is a custom hook that invokes React.useContext
   * for a store object that contains a state object for each
   * generated state and model class.
   *
   * in this demo we pull out the users state instance
   * by destructuring all the stores.
   */
  const { users } = useStores();

  /**
   * the EntityAdmin component handles everything from the state
   * passed to it. EntityAdmin and it's subcomponents are all HOC
   * components which are wrapped by react-mobx's observer function
   */
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <EntityAdmin state={users} />
      </div>
    </ThemeProvider>
  );
}

export default App;
