/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SideBar from "../../Common/SideBar/SideBar";
import ContactList from "../../Common/ContactList/ContactList";
import DefaultPage from "./DefaultPage/DefaultPage";
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection";
import GroupMediaSection from "../Chat/GroupChat/GroupMediaSection/GroupMediaSection";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile"
import { io } from "socket.io-client";
import "./Chat.css";

toast.configure();


function Chat() {

  let navigate = useNavigate();


  const [showdefault, setDefault] = useState(true);
  const [showgroup, setGroup] = useState(false);

  var socket = useRef();

  useEffect(() => {
    debugger
    if(localStorage.getItem('token') === null 
      || localStorage.getItem('token') === undefined 
      || localStorage.getItem('token') === ''){
        toast.warning('You Are Logged out Please Login..!',{autoClose:2000})
        navigate('/');
      }
      else{
        socket.current = io("http://localhost:5000");
        socket.current.emit("add-user", localStorage.getItem("userid"));
      }
  }, []);

  useEffect(() => {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined || localStorage.getItem('token') === ''){
      navigate('/');
    }
    else{

    socket.current.on("online-users", (data) => {
      console.log(data);
    });
  }
  }, [socket]);


  const changescreen =(setdefault,settype) =>{
    setDefault(setdefault);
    setGroup(settype);
  }

  return (
    <div className="main-container">
      <section className="sidebar">
        <SideBar />
      </section>
      <section className="contact-list">
        <ContactList changescreen={changescreen} />
      </section>

      {showdefault ? (
        <seciton className="default-page">
          <DefaultPage />
          {/* <Profile /> */}
        </seciton>
      ) : (
        <>
          <section className="main-chat-screen">
            {showgroup ? <GroupChatScreen /> : <SingleChatScreen />}
          </section>
          <section className="media-section">
            {showgroup ? <GroupMediaSection /> : <SingleMediaSection />}
          </section>
        </>
      )}
    </div>
  );
}

export default Chat;
