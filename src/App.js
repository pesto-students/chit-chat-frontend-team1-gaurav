import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"
import  Signup  from "./Pages/Signup/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Chat from "./Pages/Chat/Chat";


import "./App.css";

function App() {
  return <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
  </div>;
}

export default App;
