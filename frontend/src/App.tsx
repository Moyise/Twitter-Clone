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
import RightBar from "./components/RightBar/RightBar";
import Message from "./components/Message/Message";
import ChatInfo from "./components/ChatInfo/ChatInfo";
import Participant from "./components/Participant/Participant";
import EmptyMessage from "./components/EmptyMessage/EmptyMessage";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import MessagesScreen from "./screens/MessagesScreen/MessagesScreen";

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

          <Route path="/messages/:id/info" exact>
            <div className="app">
              <Sidebar />
              <MessagesScreen />
              <ChatInfo />
            </div>
          </Route>

          <Route path="/messages/:id/participants" exact>
            <div className="app">
              <Sidebar />
              <MessagesScreen />
              <Participant />
            </div>
          </Route>

          <Route path="/messages/:id" exact>
            <div className="app">
              <Sidebar />
              <MessagesScreen />
              <Message />
            </div>
          </Route>

          <Route path="/messages" exact>
            <div className="app">
              <Sidebar />
              <MessagesScreen />
              <EmptyMessage />
            </div>
          </Route>

          <Route path="/posts/:id" exact>
            <div className="app">
              <Sidebar />
              <PostScreen />
              <RightBar />
            </div>
          </Route>

          <Route path="/search/:keyword?/:posts" exact>
            <div className="app">
              <Sidebar />
              <SearchScreen />
              <RightBar />
            </div>
          </Route>

          <Route path="/profile/:id/:follows" exact>
            <div className="app">
              <Sidebar />
              <FollowsScreen />
              <RightBar />
            </div>
          </Route>

          <Route path="/profile/:id" exact>
            <div className="app">
              <Sidebar />
              <ProfileScreen />
              <RightBar />
            </div>
          </Route>

          <Route path="/home" exact>
            <div className="app">
              <Sidebar />
              <HomeScreen />
              <RightBar />
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
