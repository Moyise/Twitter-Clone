import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import "./app.scss";
import PostScreen from "./screens/PostScreen/PostScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import FollowsScreen from "./screens/FollowsScreen/FollowsScreen";

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

          <Route path="/posts/:id" exact>
            <div className="app">
              <Sidebar />
              <PostScreen />
            </div>
          </Route>

          <Route path="/profile/:id/:follows" exact>
            <div className="app">
              <Sidebar />
              <FollowsScreen />
            </div>
          </Route>

          <Route path="/profile/:id" exact>
            <div className="app">
              <Sidebar />
              <ProfileScreen />
            </div>
          </Route>

          <Route path="/home" exact>
            <div className="app">
              <Sidebar />
              <HomeScreen />
            </div>
          </Route>

          <Route path="/" exact>
            <div className="app">
              <LoadingScreen />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
