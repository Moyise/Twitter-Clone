import React, { useEffect, useState } from "react";
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
//import NotificationBadge from "./components/NotificationBadge/NotificationBadge";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import MessagesScreen from "./screens/MessagesScreen/MessagesScreen";
import NotificationScreen from "./screens/NotificationScreen/NotificationScreen";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {dimensions.width <= 988 ? (
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
                  {dimensions.width >= 499 && <Sidebar />}
                  <ChatInfo />
                </div>
              </Route>

              <Route path="/messages/:id/participants" exact>
                <div className="app">
                  {dimensions.width >= 499 && <Sidebar />}
                  <Participant />
                </div>
              </Route>

              <Route path="/messages/:id" exact>
                <div className="app">
                  {dimensions.width >= 499 && <Sidebar />}
                  <Message />
                </div>
              </Route>

              <Route path="/messages" exact>
                <div className="app">
                  <Sidebar />
                  <MessagesScreen />
                </div>
              </Route>

              <Route path="/notifications" exact>
                <div className="app">
                  <Sidebar />
                  <NotificationScreen />
                  <RightBar />
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

              <Route>
                <div className="app">
                  <Sidebar />
                  <NotFoundScreen />
                </div>
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
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
                  {/* <NotificationBadge /> */}
                  <ChatInfo />
                </div>
              </Route>

              <Route path="/messages/:id/participants" exact>
                <div className="app">
                  <Sidebar />
                  <MessagesScreen />
                  {/* <NotificationBadge /> */}
                  <Participant />
                </div>
              </Route>

              <Route path="/messages/:id" exact>
                <div className="app">
                  <Sidebar />
                  <MessagesScreen />
                  {/* <NotificationBadge /> */}
                  <Message />
                </div>
              </Route>

              <Route path="/messages" exact>
                <div className="app">
                  <Sidebar />
                  <MessagesScreen />
                  {/* <NotificationBadge /> */}
                  <EmptyMessage />
                </div>
              </Route>

              <Route path="/notifications" exact>
                <div className="app">
                  <Sidebar />
                  <NotificationScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/posts/:id" exact>
                <div className="app">
                  <Sidebar />
                  <PostScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/search/:keyword?/:posts" exact>
                <div className="app">
                  <Sidebar />
                  <SearchScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/profile/:id/:follows" exact>
                <div className="app">
                  <Sidebar />
                  <FollowsScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/profile/:id" exact>
                <div className="app">
                  <Sidebar />
                  <ProfileScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/home" exact>
                <div className="app">
                  <Sidebar />
                  <HomeScreen />
                  {/* <NotificationBadge /> */}
                  <RightBar />
                </div>
              </Route>

              <Route path="/" exact>
                <div className="app">
                  <LoadingScreen />
                </div>
              </Route>

              <Route>
                <div className="app">
                  <Sidebar />
                  <NotFoundScreen />
                </div>
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
