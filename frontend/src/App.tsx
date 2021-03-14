import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
