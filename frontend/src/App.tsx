import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignupScreen from "./screens/SignupScreen/SignupScreen";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>

          <Route path="/signup" exact>
            <SignupScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
