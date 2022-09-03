/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import SideBar from "../../Common/SideBar/SideBar";
import SearchBar from "Common/SearchBar/SearchBar";
import ContactList from "../../Common/ContactList/ContactList";
import DefaultPage from "./DefaultPage/DefaultPage";
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection";
import GroupMediaSection from "./GroupChat/GroupMediaSection/GroupMediaSection";
import Profile from "../Profile/Profile"
import { io } from "socket.io-client";
import {setCurrentOnlinUsers,loadCurrentContacts} from "Redux/Actions/SingleChatActions"

import "./Chat.css";

toast.configure();


function Chat() {

  const state = useSelector((state) => state.SingleChatReducer);  
  const groupstate = useSelector((state) => state.GroupChatReducer);
  const userstate = useSelector((state) => state.UserReducer);  
  var {receiverDetails} = state;
  var {receiverGroupDetails}=groupstate
  let {view}=userstate;
  const dispatch=useDispatch();

  let navigate = useNavigate();


  const [groupid,setgroupid] = useState('');

  var socket = useRef()

  useEffect(() => {
      var JWTtoken = localStorage.getItem('token');

      if(JWTtoken)
      {
        var jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))
    
        var tokenExpired = (jwtPayload.exp*1000) <= Date.now();
  
        if(!tokenExpired){
  
          socket.current = io(process.env.REACT_APP_SERVER);
          socket.current.emit("add-user", localStorage.getItem("userid"));

        }
        else{
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('username');
          toast.warning('You Are Logged out Please Login..!',{autoClose:2000})
          navigate('/login');
        }
      }
      else{
  
        toast.warning('You Are Logged out Please Login..!',{autoClose:2000})
        navigate('/login');
      }

  }, []);

  useEffect(() => {
    
    var JWTtoken = localStorage.getItem('token');

    if(JWTtoken)
    {
      var jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))
  
      var tokenExpired = (jwtPayload.exp*1000) <= Date.now();

      if(!tokenExpired){

        socket.current.on("online-users", (data) => {
          dispatch(setCurrentOnlinUsers(data));
        });

        socket.current.on("reload-contacts", (data) => {
          dispatch(loadCurrentContacts());
        });
      }
      else{
        navigate('/');
      }
    }
    else{
      navigate('/');
    }

  }, [socket]);


  


  // const changeContact = (showContact) =>{
  //   setContacts(showContact);
  // }

  return (
    <div className="main-container">
      <section className="sidebar">
        <SideBar />
      </section>
      <section className="contact-list">
         <ContactList socket={socket} /> 
      </section>

      {view=='default' ? (
        <seciton className="default-page">
          <DefaultPage />
        </seciton>
      ) : (
        <>
          <section className="main-chat-screen">
            {view=='group' ? <GroupChatScreen socket={socket} /> : <SingleChatScreen  socket={socket}/>}
          </section>
          <section className="media-section">
            {view=='group' ? <GroupMediaSection /> : <SingleMediaSection groupid={groupid} socket={socket}/>}
          </section>
        </>
      )}
    </div>
  );
}

export default Chat;
