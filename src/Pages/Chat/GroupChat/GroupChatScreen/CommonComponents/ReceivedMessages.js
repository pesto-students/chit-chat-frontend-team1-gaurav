import React from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import downloadDocument from "Assets/download-document.png";
import threeDot from "Assets/three-dot.png";
import starWhite from "Assets/star-white.svg";
import gmi2 from "Assets/group-message-image-2.png";
import { useDispatch, useSelector } from "react-redux";
import { getGroupStaredMessages } from "Redux/Actions/GroupChatActions";

toast.configure();

function ReceivedMessages({ messagetype, payload, shouldBeRound, groupid }) {

  const dispatch = useDispatch();

  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const { receiverGroupDetails } = groupDetails;

  const getUserNameFromUserID = (userid) => {
    var username;
    receiverGroupDetails.groupmembersarray.map((member) => {
      if (member.userid === userid) username = member.username;
    });

    return username;
  };

  const getUserImageFromUserID = (userid) => {
    // default image
    var userImage = gmi2;

    receiverGroupDetails.groupmembersarray.map((member) => {
      if (member.userid === userid)
        if (member.profileImg !== "" && member.profileImg !== undefined)
          userImage = `${
            process.env.REACT_APP_AWS_BUCKET_PATH
          }${encodeURIComponent(member.profileImg)}`;
    });

    return userImage;
  };

  const getDesiredTimeStamp = (timestamp) => {
    return `${new Date(timestamp).getHours() < 10 ? "0" : ""}${new Date(
      timestamp
    ).getHours()}:${new Date(timestamp).getMinutes() < 10 ? "0" : ""}${new Date(
      timestamp
    ).getMinutes()}`;
  };

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(
      message,
      process.env.REACT_APP_MESSAGE_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  };

  const downloadDocumentToLocal = (documenturl) => {
    let url = `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(documenturl)}`;
    let link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const starMessage = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/starmarkmessage`, {
        userid: localStorage.getItem("userid"),
        groupid: groupid,
        message: payload.message,
        senderid: payload.senderid,
        timestamp: payload.timestamp,
        type: "Received",
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.message, { autoClose: 1000 });
          dispatch(getGroupStaredMessages(groupid));
        } else {
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

  // Normal Message With round border
  if (messagetype === "message" && shouldBeRound) {
    return (
      <div className="group-message">
        <div className="group-message-image"></div>
        <div
          className="group-message-content"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="group-message-message">
            {getDecryptedMessage(payload.message)}
          </div>
          <div className="hover-star-white" onClick={starMessage}>
            <img src={starWhite} alt="star"></img>
          </div>
        </div>
      </div>
    );

    // normal Message with one side sharp edge
  } else if (messagetype === "message" && !shouldBeRound) {
    return (
      <div className="group-message">
        <div className="group-message-image">
          <img src={getUserImageFromUserID(payload.senderid)} alt=""></img>
        </div>
        <div
          className="group-message-content last-reveived-message"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ flexDirection: "column" }}>
            <div className="group-message-name">
              {getUserNameFromUserID(payload.senderid)}
            </div>
            <div className="group-message-message">
              {getDecryptedMessage(payload.message)}
            </div>
          </div>
          <div className="hover-star-white" onClick={starMessage}>
            <img src={starWhite} alt="star"></img>
          </div>
        </div>
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );

    // Normal image With round border
  } else if (messagetype === "image" && shouldBeRound) {
    return (
      <div className="group-message">
        <div className="group-message-image"></div>
        <div className="group-image-content">
          {/* <div className='group-message-name'>{getUserNameFromUserID(payload.senderid)}</div> */}
          <div className="group-image-display">
            <img
              src={`${
                process.env.REACT_APP_AWS_BUCKET_PATH
              }${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="group-image-desc">
            {getDecryptedMessage(payload.message)}
          </div>
        </div>
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );

    // normal image with one side sharp edge
  } else if (messagetype === "image" && !shouldBeRound) {
    return (
      <div className="group-message">
        <div className="group-message-image">
          <img src={getUserImageFromUserID(payload.senderid)} alt=""></img>
        </div>
        <div className="group-image-content last-reveived-message">
          <div className="group-message-name">
            {getUserNameFromUserID(payload.senderid)}
          </div>
          <div className="group-image-display">
            <img
              src={`${
                process.env.REACT_APP_AWS_BUCKET_PATH
              }${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="group-image-desc">
            {getDecryptedMessage(payload.message)}
          </div>
        </div>
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );

    // normal Document
  } else if (messagetype === "document") {
    return (
      <div className="group-message">
        <div className="group-message-image">
          <img src={getUserImageFromUserID(payload.senderid)} alt=""></img>
        </div>
        <div className="group-image-content last-reveived-message">
          <div className="group-document-header">
            <div className="group-message-name">
              {getUserNameFromUserID(payload.senderid)}
            </div>
            <div className="three-dot-icon">
              <img src={threeDot} alt=""></img>
            </div>
          </div>
          <div className="group-document-content">
            <div
              className="download-document-icon"
              onClick={() => downloadDocumentToLocal(payload.key)}
            >
              <img src={downloadDocument} alt=""></img>
            </div>
            <div className="group-document-details">
              <div className="group-document-name">
                {payload.message.documentName}
              </div>
              <div className="group-document-detail">
                {payload.message.documentSize}{" "}
                <span>{payload.message.documentExtention}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  }
}

export default ReceivedMessages;
