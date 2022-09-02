import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"
import  Signup  from "./Pages/Signup/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Chat from "./Pages/Chat/Chat";
import SearchSingleContact from 'Pages/Chat/SearchSingleContact/SearchSingleContact'
import CreateGroupChat from "./Pages/Chat/CreateGroupChat/CreateGroupChat";
import { useSelector,useDispatch } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';

import "./App.css";


function App() {
  let {loading} = useSelector((state) => state.UserReducer);
  console.log('loading state',loading);
  LoadingOverlay.propTypes = undefined
const loggedin = () =>{
  if(localStorage.getItem('token') === null 
  || localStorage.getItem('token') === undefined 
  || localStorage.getItem('token') === ''){
    return false;
  }
  else{
    return true;
  }
}

  return (
    <LoadingOverlay
    active={false}
    spinner
    text='Loading your content...'>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={loggedin?<Profile />:<Home/>} />
        <Route path="/Chat" element={loggedin?<Chat />:<Home/>} />
        <Route path="/search" element={loggedin?<SearchSingleContact />:<Home/>} />
        <Route path="/creategroup" element={loggedin?<CreateGroupChat />:<Home/>} />
      </Routes>
      </div>
  </LoadingOverlay>
  );
}

export default App;
