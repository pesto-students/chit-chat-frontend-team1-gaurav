/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ReceivedMessages from "./CommonComponents/ReceivedMessages";
import SentMessages from "./CommonComponents/SentMessages";
import { useDebouncedCallback } from "use-debounce";
import CryptoJS from "crypto-js";
import axios from "axios";
import InputEmoji from 'react-input-emoji';
import Picker from 'emoji-picker-react';
import singleHeaderImg from "Assets/single-header-img.png";
import search from "Assets/search.png";
import audioCall from "Assets/audio-call.png";
import videoCall from "Assets/videocallchat.png";
import attachment from "Assets/attachment.png";
import send from "Assets/send.png";
import emoji from "Assets/emoji.png";
import imageAttachment from "Assets/image-attachment.png";
import documentAttachment from "Assets/document-attachment.png";
import sendMedia from "Assets/send-media.png";
import crossWhite from "Assets/cross-white.png";
import "./SingleChatScreen.css";
import {
  updateChatInfo,
  loadCurrentContacts,
  updateCurrentChat,
} from "Redux/Actions/SingleChatActions";

toast.configure();

function SingleChatScreen({ socket }) {

  const dispatch = useDispatch();  

  const [showAttachment, setAttachmentToggle] = useState(false);
  const [showMediaScreen, setMediaToggle] = useState(false);
  const [isuseronline, setuseronline] = useState(true);
  const [isreceivertyping, setreceivertyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [imgMessage, setimgMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const state = useSelector((state) => state.SingleChatReducer);
  var { SingleChatMessageArray, SingleChatInfo, onlineUsers, receiverDetails } = state;

  // Checks if Receiver is online when we start conversation
  useEffect(() => {
    for (const user of onlineUsers) {
      if (user.userid === receiverDetails.userid) {
        setuseronline(true);
        return;
      } else {
        setuseronline(false);
      }
    }
  }, []);

  // to load received chat real time and set typing status real time
  useEffect(() => {

    if (socket.current !== undefined) {

      socket.current.on("receive-message", (data) => {
        dispatch(updateCurrentChat(data));
      });

      socket.current.on("receiver-typing", (data) => {
        setreceivertyping(true);
      });

      socket.current.on("receiver-stops-typing", (data) => {
        setreceivertyping(false);
      });

    }
  }, [socket]);

  // set receiver online status real time
  useEffect(() => {
    for (const user of onlineUsers) {
      if (user.userid === receiverDetails.userid) {
        setuseronline(true);
        return;
      } else {
        setuseronline(false);
      }
    }
  }, [onlineUsers]);


  const getTimeDifference = (index) => {
    

    if(index === 0){
      return false;
    }
    else{
      if(((Number(SingleChatMessageArray[index-1].timestamp) - Number(SingleChatMessageArray[index].timestamp))/60000) < 1){
        return true;
      }
      else{
        return false;
      }
    }

  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("user-typing", receiverDetails.userid);
  };


  const keyUpHandler = () => {
    socket.current.emit("user-stops-typing", receiverDetails.userid);
  };


  const sendMessage = () =>{
    if(newMessage !== '')
    UpdateChat('message');
    setNewMessage(""); 
  }


  const sendImage = () => {
    setimgMessage("");
    setSelectedFile("");
    setMediaToggle(false);
    UpdateChat("image");
  };


  const closeHandler = () =>{
    setimgMessage("");
    setSelectedFile("");
    setMediaToggle(false);
  }


  const UpdateChat = async (messageType) => {

    //For set chats order based on last sent message
    var updateOrder = false;
    var order = 0;
    let lastChatId = JSON.parse(localStorage.getItem("order"))[0];
  

    if (lastChatId === "") {

      localStorage.setItem("order",JSON.stringify([receiverDetails.userid, 1]));
      updateOrder = true;
      order = 1;

    } else if (lastChatId !== receiverDetails.userid) {

      updateOrder = true;
      order = JSON.parse(localStorage.getItem("order"))[1] + 1;
      localStorage.setItem("order",JSON.stringify([receiverDetails.userid, order]));
    }


    // send message to backend
    let messagePayload = {
      type: messageType,
      messageid: Math.random().toString(16).slice(2),
      message: messageType === "message"
               ? CryptoJS.AES.encrypt(newMessage,'dhruvin').toString()
               : CryptoJS.AES.encrypt(imgMessage,'dhruvin').toString(),
     
      senderid: localStorage.getItem("userid"),
      receiverid: receiverDetails.userid,
      chatid: receiverDetails.chatid,
      updateOrder: updateOrder,
      order: order,
      starmarked: false,
      url: messageType === "image" ? "Assets/send-media.png" : "",
    };


    new Promise((resolve,reject) => {

      axios
      .post("http://localhost:5000/chat/updatemessagearray", messagePayload)
      .then((res) => {
        if (res.data.message) {

          socket.current.emit("send-message", res.data);
          dispatch(updateCurrentChat(res.data));
          dispatch(loadCurrentContacts());


          // When Chat Creater Initiate First Chat
          if(!SingleChatInfo.senderaddedtoreceiver) 
           resolve(); 
         
        }
      })

    })
    .then(() => {
     
        axios
          .post("http://localhost:5000/chat/addSenderToReceiver", {
            senderid: localStorage.getItem("userid"),
            receiverid: receiverDetails.userid,
            chatid: receiverDetails.chatid,
          })
          .then((res) => {
            if (res.data.statusCode === 200) {

              dispatch(updateChatInfo({ ...SingleChatInfo, senderaddedtoreceiver: true,}));
              socket.current.emit("contact-added", {receiverid: receiverDetails.userid});

            }
          })  

    })
    .catch((err) => {
      toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
    });
  
  };


  const filterChatDateWise = (chatArray) => {
debugger
    if(chatArray.length > 0){
    let firstDate = chatArray[0].timestamp;
    let lastDate = chatArray[chatArray.length - 1].timestamp;

    let hello;
    }

  }


  return (
    <div className="single-main-container">
      <header className="single-chat-header">
        <div className="single-header-leftbar">
          <div className="single-header-logo">
            <img src={singleHeaderImg} alt="chat-logo"></img>
          </div>
          <div className="single-header-info">
            <h1 className="single-person-name">
              {receiverDetails !== undefined ? receiverDetails.username : ""}
            </h1>
            <div className="single-status">
              {isreceivertyping ? (
                <div className="typing">
                  {receiverDetails.username} is typing...
                </div>
              ) : (
                <>
                  <span
                    class={
                      "single-status-dot " + (isuseronline ? "" : "ofline")
                    }
                  ></span>
                  <div className="single-status-name">
                    {isuseronline ? "Online" : "Offline"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="single-header-icons">
          <div className="right-icons video-call-single">
            <img src={videoCall} alt="video-call"></img>
          </div>
          <div className="right-icons">
            <img src={audioCall} alt="audio-call"></img>
          </div>
          <div className="right-icons ">
            <img src={search} alt="search"></img>
          </div>
        </div>
      </header>

      {/* <header className="single-calling-header">
          <div className="someone-calling">Hardik is Calling...</div>
          <div className="action-buttons">
            <button className="accept-button">Accept</button>
            <button className="reject-button">Reject</button>
          </div>
      </header> */}

      {/* Main - section  */}

      <section className="single-main-section">
        <fieldset className="day-container">
          <legend> Yesterday </legend>
          {filterChatDateWise(SingleChatMessageArray)}
          {SingleChatMessageArray.map((message,i) => {
              if (message.senderid === receiverDetails.userid) {
                return (
                  <ReceivedMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                    shouldBeRound={getTimeDifference(i)}
                  />
                );
              } else {

                return (
                  <SentMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                    shouldBeRound={getTimeDifference(i)}
                  />
                );
              }
            })}



        </fieldset>
      </section>

      {/* Footer */}

      <footer className="single-chat-footer">

        {/* add attachment popup */}
        <div className={"single-attachment " + (!showAttachment ? "hide" : "")}>
          <div className="single-image-attachment">
            <div className="single-attachment-icon">
              <img src={imageAttachment} alt="img-attachment"></img>
            </div>
            <div className="single-attachment-text">Photo or Video</div>
          </div>
          <div className="single-image-attachment">
            <div className="single-attachment-icon">
              <img src={documentAttachment} alt="img-attachment"></img>
            </div>
            <div className="single-attachment-text">Documents</div>
          </div>
        </div>


         {/* Send Media Popup    */}
        <div className={"send-media-screen " + (!showMediaScreen ? "hide" : "")}>
          <div className="image-close" onClick={closeHandler} >
            <img src={crossWhite} alt="" ></img>
          </div>
          <div className="display-image-single-send">
            <img src={selectedFile} alt=""></img>
          </div>
          <div className="image-message">
            <input type="text" placeholder="Type a Message...." value={imgMessage} onChange={(e) => {setimgMessage(e.target.value); }} ></input>
            <div className="img-send" onClick={sendImage}>
              <img src={sendMedia} alt=""></img>
            </div>
          </div>
        </div>

            {/* Actual footer */}
        <div className="single-attach-icon" onClick={() => { setAttachmentToggle(!showAttachment); }}>
          <img src={attachment} alt="attach"></img>
        </div>

        <div className="single-footer-message">
          <input type="text" value={newMessage} 
            placeholder={'write a message for ' + (receiverDetails !== undefined ? receiverDetails.username : "") + '...'} 
            onChange={typingHandler}
            onKeyUp={useDebouncedCallback(keyUpHandler, 1500)}>
          </input>
        </div>

        <div className="single-footer-right-icons">
            {/* <InputEmoji /> */}
            {/* <Picker pickerStyle={{}} /> */}

          <div className="single-footer-right-icon">
            <img src={emoji} alt="emoji"></img>
          </div>
          <div className="single-footer-right-icon" onClick={sendMessage}>
            <img src={send} alt="send"></img>
          </div>
        </div>

        <div className="single-right-footer"></div>
      </footer>
    </div>
  );
}

export default SingleChatScreen;
