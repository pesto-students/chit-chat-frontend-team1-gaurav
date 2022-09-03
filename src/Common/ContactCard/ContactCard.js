import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import Sample from "../../Assets/SampleUserImg1.png";
import AWS from "aws-sdk";
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
} from "../../Redux/Actions/GroupChatActions";
import { setView } from "../../Redux/Actions/UserActions";
import doubletick from "Assets/double-tick.png";

import "./ContactCard.css";

export function ContactCard({
  socket,
  chatDetails,
  chatType,
  activeUserId,
  setActiveUserid,
}) {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  const dispatch = useDispatch();

  const [profileimg, setProfileimg] = useState("");

  const getTimeStamp = (timestamp) => {
    if (timestamp === "" || timestamp === undefined || timestamp === null) {
      return "";
    } else {
      return (
        new Date(timestamp).getHours() + ":" + new Date(timestamp).getMinutes()
      );
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

  useEffect(() => {
    if (chatDetails.profileImg === "" || chatDetails.profileImg === undefined) {
      setProfileimg(Sample);
    } else {
      myBucket.getObject(
        {
          Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
          Key: chatDetails.profileImg,
        },

        (err, data) => {
          if (err) setProfileimg(Sample);

          setProfileimg(
            `data:image/png;base64,${data.Body.toString("base64")}`
          );
        }
      );
    }
  },[])

  
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




  const onClickHandler = () => {
    if (chatType === "single") {
      dispatch(setView("single"));
      dispatch(setReceiverDetails(chatDetails));
      dispatch(resetMessageArray());
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
      dispatch(loadCurrentGroupChat(chatDetails.groupid, 0, 25));
      dispatch(getGroupImagesArray(chatDetails.groupid));
      dispatch(getGroupDocumentsArray(chatDetails.groupid));
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
      <img
        alt="profile-img"
        className="profile-img"
        src={profileimg}
      />

      <div className="chat-profile-details">
        <h3>{username}</h3>
        <span>
          {chatDetails.sent && (
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
