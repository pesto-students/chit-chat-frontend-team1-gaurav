import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import Sample from "Assets/single-header-img.png";
import groupPic from "Assets/group-icon.png";
import {
  setReceiverDetails,
  getStaredMessages,
  resetMessageArray,
  loadCurrentChat,
  getImagesArray,
  getDocumentsArray,
} from "Redux/Actions/SingleChatActions";
import {
  setReceiverGroupDetails,
  getGroupStaredMessages,
  ResetMessageArray,
  loadCurrentGroupChat,
  getGroupDocumentsArray,
  getGroupImagesArray,
  getMembersArray
} from "../../Redux/Actions/GroupChatActions";
import { setLoading, setView } from "Redux/Actions/UserActions";
import doubletick from "Assets/double-tick.png";

import "./ContactCard.css";

export function ContactCard({
  socket,
  chatDetails,
  chatType,
  activeUserId,
  setActiveUserid,
}) {
  const dispatch = useDispatch();

  const [profileimg, setProfileimg] = useState("");

  const getTimeStamp = (timestamp) => {
    if (timestamp === "" || timestamp === undefined || timestamp === null) {
      return "";
    } else {
      return `${new Date(timestamp).getHours() < 10 ? "0" : ""}${new Date(
        timestamp
      ).getHours()}:${
        new Date(timestamp).getMinutes() < 10 ? "0" : ""
      }${new Date(timestamp).getMinutes()}`;
    }
  };

  const getDecryptedMessage = (message) => {
    return message === undefined
      ? ""
      : CryptoJS.AES.decrypt(
          message,
          process.env.REACT_APP_MESSAGE_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
  };

  // for Setting up profile images for chats
  useEffect(() => {
    if (chatType === "single") {
      if (
        chatDetails.profileImg === "" ||
        chatDetails.profileImg === undefined
      ) {
        setProfileimg(Sample);
      } else {
        setProfileimg(
          `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(
            chatDetails.profileImg
          )}`
        );
      }
    } else {
      setProfileimg(groupPic);
    }
  }, []);

  let mockProps = {
    name: chatDetails ? chatDetails.username : "",
    lastChatMessage: chatDetails
      ? getDecryptedMessage(chatDetails.lastMessage)
      : "",
    lastChatTime: chatDetails ? getTimeStamp(chatDetails.timestamp) : "",
    unseenMsgs: "2",
  };

  if (chatType === "single") {
    var { username } = chatDetails;
  } else {
    var { groupname: username } = chatDetails;
  }

  var isActive;

  if (chatType === "single") {
    if (
      activeUserId === (chatDetails !== undefined ? chatDetails.userid : "")
    ) {
      isActive = true;
    }
  } else {
    if (
      activeUserId === (chatDetails !== undefined ? chatDetails.groupid : "")
    ) {
      isActive = true;
    }
  }

  // setting up initial data of receiver user of group initially
  const onClickHandler = () => {
    dispatch(setLoading(true));
    if (chatType === "single") {
      dispatch(setView("single"));
      dispatch(setReceiverDetails(chatDetails));
      dispatch(resetMessageArray());
      // initially it will load first 25 messages
      dispatch(loadCurrentChat(chatDetails.chatid, 0, 25));
      dispatch(getImagesArray(chatDetails.chatid));
      dispatch(getDocumentsArray(chatDetails.chatid));
      dispatch(getStaredMessages(chatDetails.chatid));
      setActiveUserid(chatDetails.userid);
    } else {
      dispatch(setView("group"));
      dispatch(setReceiverGroupDetails(chatDetails));
      setActiveUserid(chatDetails.groupid);
      dispatch(ResetMessageArray());
      // initially it will load first 25 messages
      dispatch(loadCurrentGroupChat(chatDetails.groupid, 0, 25));
      dispatch(getGroupImagesArray(chatDetails.groupid));
      dispatch(getGroupDocumentsArray(chatDetails.groupid));
      dispatch(getMembersArray(chatDetails.groupid));
      dispatch(getGroupStaredMessages(chatDetails.groupid));
      socket.current.emit("join-group", chatDetails.groupid);
    }
  };

  return (
    <div
      onClick={onClickHandler}
      className={"chatcard-container " + (isActive && "border-bottom-none")}
    >
      {isActive && <div className="overlay"></div>}
      <img alt="profile-img" className="profile-img" src={profileimg} />

      <div className="chat-profile-details">
        <h3>{username}</h3>
        <span>
          {chatDetails.sent && mockProps.lastChatMessage !== "" && (
            <div className="tick-icon-contact">
              <img src={doubletick} alt=""></img>
            </div>
          )}
          {mockProps.lastChatMessage}
        </span>
      </div>

      <div className="time">
        <span>{mockProps.lastChatTime}</span>
        {/* <span className="unseen">{mockProps.unseenMsgs}</span> */}
      </div>
    </div>
  );
}
