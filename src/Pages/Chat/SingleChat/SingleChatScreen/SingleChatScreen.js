/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
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
import {
  loadCurrentChat,
  setCurrentOnlinUsers,
  updateChatInfo,
  loadCurrentContacts,
  updateCurrentChat,
} from "Redux/Actions/SingleChatActions";

toast.configure();

function SingleChatScreen({ userDetails, socket }) {
  const [showAttachment, setAttachmentToggle] = useState(false);
  const [isuseronline, setuseronline] = useState(true);
  const [isreceivertyping, setreceivertyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const state = useSelector((state) => state.SingleChatReducer);
  var { SingleChatMessageArray, SingleChatInfo, onlineUsers, receiverDetails } =
    state;
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (socket.current !== undefined) {
      socket.current.on("online-users", (data) => {
        dispatch(setCurrentOnlinUsers(data));
      });

      socket.current.on("receive-message", (data) => {
        dispatch(loadCurrentChat(receiverDetails.chatid));
      });

      socket.current.on("receiver-typing", (data) => {
        setreceivertyping(true);
      });

      socket.current.on("receiver-stops-typing", (data) => {
        setreceivertyping(false);
      });
    }
  }, [socket]);

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

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("user-typing", receiverDetails.userid);
  };

  const keyUpHandler = () => {
    socket.current.emit("user-stops-typing", receiverDetails.userid);
  };

  const sendMessage = async () => {
    // let encryptedMessage = CryptoJS.AES.encrypt(newMessage, 'dhruvin').toString();

    var updateOrder = false;
    var order = 0;

    let orderVar = JSON.parse(localStorage.getItem("order"))[0];

    if (orderVar === "") {
      localStorage.setItem(
        "order",
        JSON.stringify([receiverDetails.userid, 1])
      );
      updateOrder = true;
      order = 1;
    } else if (orderVar !== receiverDetails.userid) {
      updateOrder = true;
      order = JSON.parse(localStorage.getItem("order"))[1] + 1;
      localStorage.setItem(
        "order",
        JSON.stringify([receiverDetails.userid, order])
      );
    } else if (orderVar === receiverDetails.userid) {
      // updateOrder:false;
    }

    let messagePayload = {
      type: "message",
      messageid:Math.random().toString(16).slice(2),
      message: newMessage,
      senderid: localStorage.getItem("userid"),
      receiverid: receiverDetails.userid,
      chatid: receiverDetails.chatid,
      updateOrder: updateOrder,
      order: order,
      starmarked:false
    };

    axios
      .post("http://localhost:5000/chat/updatemessagearray", messagePayload)
      .then((res) => {
        if (res.data.message) {
          socket.current.emit("send-message", res.data);

          dispatch(loadCurrentContacts());

          
          let newMessageArray = [res.data, ...SingleChatMessageArray];
          
          dispatch(updateCurrentChat(newMessageArray));
          setNewMessage("");
         
          
          if (!SingleChatInfo.senderaddedtoreceiver) {
            axios
              .post("http://localhost:5000/chat/addSenderToReceiver", {
                senderid: localStorage.getItem("userid"),
                receiverid: receiverDetails.userid,
                chatid: receiverDetails.chatid,
              })
              .then((res) => {
                if (res.data.statusCode === 200) {
                  dispatch(
                    updateChatInfo({
                      ...SingleChatInfo,
                      senderaddedtoreceiver: true,
                    })
                  );

                  socket.current.emit("contact-added", {
                    receiverid: receiverDetails.userid,
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

          {console.log(SingleChatMessageArray)}
          {SingleChatMessageArray.slice(0)
            .reverse()
            .map((message) => {

              if (message.senderid === receiverDetails.userid) {
                return (
                  <ReceivedMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                  />
                );
              } else {
                return (
                  <SentMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                  />
                );
              }
            }
            )}
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
            placeholder="write a message for  ..."
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
