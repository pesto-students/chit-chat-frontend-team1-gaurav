/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReceivedMessages from "./CommonComponents/ReceivedMessages";
import SentMessages from "./CommonComponents/SentMessages";
import { useDebouncedCallback } from "use-debounce";
import CryptoJS from "crypto-js";
import axios from "axios";
import singleHeaderImg from "../../../../Assets/single-header-img.png";
import search from "../../../../Assets/search.png";
import audioCall from "../../../../Assets/audio-call.png";
import videoCall from "../../../../Assets/videocallchat.png";
import attachment from "../../../../Assets/attachment.png";
import send from "../../../../Assets/send.png";
import emoji from "../../../../Assets/emoji.png";
import imageAttachment from "../../../../Assets/image-attachment.png";
import documentAttachment from "../../../../Assets/document-attachment.png";
import "./SingleChatScreen.css";

toast.configure();

function SingleChatScreen({ userdetails, socket, receivedonlineusers }) {
  const [showAttachment, setAttachmentToggle] = useState(false);
  const [onlineusers, setonlineusers] = useState(receivedonlineusers);
  const [isuseronline, setuseronline] = useState(false);
  const [isreceivertyping, setreceivertyping] = useState(false);
  const [messageArray, setMessageArray] = useState([]);
  const [chatinfo, setchatinfo] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    debugger;
    axios
      .post("http://localhost:5000/chat/loadchat", {
        chatid: userdetails.chatid,
      })
      .then((res) => {
        setMessageArray(res.data.messageArray);
        setchatinfo(res.data.chatInfo);
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });

    for (const user of receivedonlineusers) {
      if (user.userid === userdetails.userid) {
        setuseronline(true);
        return;
      } else {
        setuseronline(false);
      }
    }
  }, []);

  useEffect(() => {
    debugger;
    socket.current.on("online-users", (data) => {
      setonlineusers(data);
    });

    socket.current.on("receive-message", (data) => {
      setMessageArray((prev) => {
        return [data, ...prev];
      });
    });

    socket.current.on("receiver-typing", (data) => {
      setreceivertyping(true);
    });

    socket.current.on("receiver-stops-typing", (data) => {
      setreceivertyping(false);
    });
  }, [socket]);

  useEffect(() => {
    for (const user of onlineusers) {
      if (user.userid === userdetails.userid) {
        setuseronline(true);
      } else {
        setuseronline(false);
      }
    }
  }, [onlineusers]);

  const typingHandler = (e) => {
    debugger;
    setNewMessage(e.target.value);
    socket.current.emit("user-typing", userdetails.userid);
  };

  const keyUpHandler = () => {
    socket.current.emit("user-stops-typing", userdetails.userid);
  };

  const sendMessage = async () => {
    debugger;
    // let encryptedMessage = CryptoJS.AES.encrypt(newMessage, 'dhruvin').toString();

    var updateOrder = false;
    var order = 0;


    let orderVar = JSON.parse(localStorage.getItem('order'))[0];


    if(orderVar === ''){
      localStorage.setItem('order',JSON.stringify([userdetails.userid,1]))
      updateOrder = true;
      order = 1;
    }
    else if(orderVar !== userdetails.userid){
      updateOrder = true;
      order = JSON.parse(localStorage.getItem('order'))[1] + 1;
      localStorage.setItem('order',JSON.stringify([userdetails.userid,order]))
    }
    else if(orderVar === userdetails.userid){
      // updateOrder:false;
    }



    let messagePayload = {
      type: "message",
      message: newMessage,
      senderid: localStorage.getItem("userid"),
      receiverid: userdetails.userid,
      chatid: userdetails.chatid,
      updateOrder:updateOrder,
      order:order,
    };

    axios
      .post("http://localhost:5000/chat/updatemessagearray", messagePayload)
      .then((res) => {
        debugger;
        if (res.data.message) {
          socket.current.emit("send-message", res.data);
          
          messageArray.unshift(res.data);
          setMessageArray(messageArray);
          setNewMessage("");

          if (!chatinfo.senderaddedtoreceiver) {
            axios
              .post("http://localhost:5000/chat/addSenderToReceiver", {
                senderid: localStorage.getItem("userid"),
                receiverid: userdetails.userid,
                chatid: userdetails.chatid,
              })
              .then((res) => {
                if (res.data.statusCode === 200) {
                  setchatinfo({ ...chatinfo, senderaddedtoreceiver: true });
                  socket.current.emit("contact-added", {
                    receiverid: userdetails.userid,
                  });
                }
              })
              .catch((err) => {
                toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
              });
          }
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

  return (
    <div className="single-main-container">
      <header className="single-chat-header">
        <div className="single-header-leftbar">
          <div className="single-header-logo">
            <img src={singleHeaderImg} alt="chat-logo"></img>
          </div>
          <div className="single-header-info">
            <h1 className="single-person-name">{userdetails.username}</h1>
            <div className="single-status">
              {isreceivertyping ? (
                <div className="typing">
                  {userdetails.username} is typing...
                </div>
              ) : (
                <>
                  <span
                    class={
                      "single-status-dot " + (isuseronline ? "" : "ofline")
                    }
                  ></span>
                  <div className="single-status-name">
                    {isuseronline ? "Online" : "Ofline"}
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

      {/* Main - section  */}

      <section className="single-main-section">
        <fieldset className="day-container">
          <legend> Yesterday </legend>

          {messageArray
            .slice(0)
            .reverse()
            .map((message) => {
              if (message.senderid === userdetails.userid) {
                return (
                  <ReceivedMessages messagetype={message.type} payload={message.message}/>
                );
              } else {
                return (
                  <SentMessages messagetype={message.type} payload={message.message}/>
                );
              }
            })}
        </fieldset>
      </section>

      {/* Footer */}

      <footer className="single-chat-footer">
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

        <div
          className="single-attach-icon"
          onClick={() => {
            setAttachmentToggle(!showAttachment);
          }}
        >
          <img src={attachment} alt="attach"></img>
        </div>

        <div className="single-footer-message">
          <input
            type="text"
            value={newMessage}
            placeholder="write a message for peter..."
            onChange={typingHandler}
            onKeyUp={useDebouncedCallback(keyUpHandler, 1500)}
            // onKeyDown={keyDownHandler}
          ></input>
        </div>

        <div className="single-footer-right-icons">
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
