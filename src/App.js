import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Chat from "./Pages/Chat/Chat";
import SearchSingleContact from "Pages/Chat/SearchSingleContact/SearchSingleContact";
import CreateGroupChat from "./Pages/Chat/CreateGroupChat/CreateGroupChat";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import "./App.css";

function App() {
  let { loading } = useSelector((state) => state.UserReducer);
  LoadingOverlay.propTypes = undefined;

  const loggedin = () => {
    var JWTtoken = localStorage.getItem("token");

    if (JWTtoken) {
      var jwtPayload = JSON.parse(window.atob(JWTtoken.split(".")[1]));

      var tokenExpired = jwtPayload.exp * 1000 <= Date.now();

      if (!tokenExpired) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <LoadingOverlay active={loading} spinner text="Loading...">
      <div className="App">
        <Routes>
          <Route path="/" element={loggedin() ? <Chat /> : <Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={loggedin ? <Profile /> : <Home />} />
          <Route path="/Chat" element={ <Chat /> } />
          <Route
            path="/search"
            element={loggedin ? <SearchSingleContact /> : <Home />}
          />
          <Route
            path="/creategroup"
            element={loggedin ? <CreateGroupChat /> : <Home />}
          />
        </Routes>
      </div>
    </LoadingOverlay>
  );
}

export default App;
