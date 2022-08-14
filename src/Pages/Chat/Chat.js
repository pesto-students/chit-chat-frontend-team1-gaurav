/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import expired from '../../Common/Common'
import SideBar from "../../Common/SideBar/SideBar";
import ContactList from "../../Common/ContactList/ContactList";
import DefaultPage from "./DefaultPage/DefaultPage";
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection";
import GroupMediaSection from "./GroupChat/GroupMediaSection/GroupMediaSection";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile"
import { io } from "socket.io-client";
import "./Chat.css";

toast.configure();


function Chat() {

  let navigate = useNavigate();


  const [showdefault, setDefault] = useState(true);
  const [showgroup, setGroup] = useState(false);
  const [userdetails,setuserdetails] = useState({userid:'',username:'',chatid:''});
  const [groupid,setgroupid] = useState('');
  const [onlineusers,setonlineusers] = useState([]);

  const [groupDetails, setGroupDetails]=useState({});

  var socket = useRef();

  useEffect(() => {
      var JWTtoken = localStorage.getItem('token');

      if(JWTtoken)
      {
        var jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))
    
        var tokenExpired = (jwtPayload.exp*1000) <= Date.now();
  
        if(!tokenExpired){
  
          socket.current = io("http://localhost:5000");
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
          setonlineusers(data);
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


  const changescreen =(setdefault,settype,chatDetails) =>{
    setDefault(setdefault);
    if(settype === 'single') {
      setGroup(false);
      setuserdetails(chatDetails); 
    } 
    else{
      setGroup(true);
      setgroupid(chatDetails.userid);
    }
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
            {showgroup ? <GroupChatScreen /> : <SingleChatScreen userdetails={userdetails} socket={socket} receivedonlineusers={onlineusers}/>}
          </section>
          <section className="media-section">
            {showgroup ? <GroupMediaSection /> : <SingleMediaSection groupid={groupid} socket={socket} receivedonlineusers={onlineusers}/>}
          </section>
        </>
      )}
    </div>
  );
}

export default Chat;
