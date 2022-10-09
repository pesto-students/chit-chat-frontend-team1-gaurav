/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../../Common/SideBar/SideBar";
import ContactList from "../../Common/ContactList/ContactList";
import DefaultPage from "./DefaultPage/DefaultPage";
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection";
import GroupMediaSection from "./GroupChat/GroupMediaSection/GroupMediaSection";
import { io } from "socket.io-client";
import {
  setCurrentOnlinUsers,
  loadCurrentContacts,
} from "Redux/Actions/SingleChatActions";

import "./Chat.css";

toast.configure();

function Chat() {
  const userstate = useSelector((state) => state.UserReducer);
  let { view } = userstate;
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [groupid, setgroupid] = useState("");

  var socket = useRef();

  /*when someone directly puts chat page url in browse and user is not logged in then 
  it will redirect user to login page*/
  useEffect(() => {
    var JWTtoken = localStorage.getItem("token");
    if (JWTtoken !== null && JWTtoken !== undefined && JWTtoken !== '') {
      var jwtPayload = JSON.parse(window.atob(JWTtoken.split(".")[1]));

      var tokenExpired = jwtPayload.exp * 1000 <= Date.now();

      if (!tokenExpired) {
        socket.current = io(process.env.REACT_APP_SERVER);
        socket.current.emit("add-user", localStorage.getItem("userid"));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        toast.warning("You Are Logged out Please Login..!", {
          autoClose: 2000,
        });
        navigate("/home");
      }
    } else {
      toast.warning("You Are Logged out Please Login..!", { autoClose: 2000 });
      navigate("/home");
    }
  }, []);

  // to set current online users available
  useEffect(() => {
    var JWTtoken = localStorage.getItem("token");

    if (JWTtoken !== null && JWTtoken !== undefined && JWTtoken !== '') {
      var jwtPayload = JSON.parse(window.atob(JWTtoken.split(".")[1]));

      var tokenExpired = jwtPayload.exp * 1000 <= Date.now();

      if (!tokenExpired) {
        socket.current.on("online-users", (data) => {
          dispatch(setCurrentOnlinUsers(data));
        });

        socket.current.on("reload-contacts", (data) => {
          dispatch(loadCurrentContacts());
        });
      } else {
        navigate("/home");
      }
    } else {
      navigate("/home");
    }
  }, [socket]);

 const getToken = () =>{
  var JWTtoken = localStorage.getItem("token");

  if (JWTtoken !== null && JWTtoken !== undefined && JWTtoken !== '') {
    return true;
  }
  else{
    return false;
  }
 }

  return (
    <div className="main-container">
      {getToken() ? <>
      <section className="sidebar">
        <SideBar socket={socket} />
      </section>
      <section className="contact-list">
        <ContactList socket={socket} />
      </section>

      {view === "default" ? (
        <seciton className="default-page">
          <DefaultPage />
        </seciton>
      ) : (
        <>
          <section className="main-chat-screen">
            {view === "group" ? (
              <GroupChatScreen socket={socket} />
            ) : (
              <SingleChatScreen socket={socket} />
            )}
          </section>
          <section className="media-section">
            {view === "group" ? (
              <GroupMediaSection />
            ) : (
              <SingleMediaSection groupid={groupid} socket={socket} />
            )}
          </section>
        </>
      )}

</>:<></>     }
    </div>
  );
}

export default Chat;
