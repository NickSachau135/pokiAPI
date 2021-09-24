import Pokemon from "./Components/Pokemon";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Route, Switch } from "react-router-dom";
import Abilities from "./Components/Abilities";

function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Pokemon />
        </Route>
        <Route path={`/:id`}>
          <Abilities />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
