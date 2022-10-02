/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Peer } from "peerjs";
import { useSelector, useDispatch } from "react-redux";
import AWS from "aws-sdk";
import ReceivedMessages from "./CommonComponents/ReceivedMessages";
import SentMessages from "./CommonComponents/SentMessages";
import { useDebouncedCallback } from "use-debounce";
import CryptoJS from "crypto-js";
import axios from "axios";
import {getFilteredMessageArrayDayWise} from "Common/Common";
import InputEmoji from "react-input-emoji";
import Picker from "emoji-picker-react";
import singleHeaderImg from "Assets/single-header-img.png";
import search from "Assets/search.png";
import audioCall from "Assets/audio-call.png";
import videoCall from "Assets/videocallchat.png";
import callreject from "Assets/call-reject.png";
import callAccept from "Assets/call-accept-white.png";
import attachment from "Assets/attachment.png";
import send from "Assets/send.png";
import emoji from "Assets/emoji.png";
import imageAttachment from "Assets/image-attachment.png";
import documentAttachment from "Assets/document-attachment.png";
import sendMedia from "Assets/send-media.png";
import crossWhite from "Assets/cross-white.png";
import hang from "Assets/hang.png";
import previewImage from "Assets/preview.png";
import "./SingleChatScreen.css";
import {
  updateChatInfo,
  loadCurrentContacts,
  updateCurrentChat,
  loadCurrentChat,
  getImagesArray,
  getDocumentsArray,
} from "Redux/Actions/SingleChatActions";
window.Buffer = window.Buffer || require("buffer").Buffer;

toast.configure();

function SingleChatScreen({ socket }) {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const inputDocumentRef = useRef(null);
  const peerInstance = useRef(null);
  const currentUserVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [showAttachment, setAttachmentToggle] = useState(false);
  const [showMediaScreen, setMediaToggle] = useState(false);
  const [showDocumentScreen, setDocumentToggle] = useState(false);
  const [isuseronline, setuseronline] = useState(false);
  const [isreceivertyping, setreceivertyping] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [calling, setCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [showVideoScreen, setVideoScreen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [imgMessage, setimgMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [displaySelectedImage, setDisplaySelectedImage] = useState("");
  const [selectedDocument, setSelectedDocument] = useState({});
  const [documentBody, setDocumentBody] = useState({});
  const [peerId, setPeerId] = useState("");
  const [lastChatNum, setLastChatNum] = useState(25);

  const state = useSelector((state) => state.SingleChatReducer);
  var { SingleChatMessageArray, SingleChatInfo, onlineUsers, receiverDetails } =
    state;
  // to get stream of audio or video from device
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozkitGetUserMedia;

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peerInstance.current = peer;
    setLastChatNum(25);

  },[]);
  
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
    debugger;
    setLastChatNum(25);

  })


  // for Video Call
  useEffect(() => {
    
    if (peerInstance.current !== null) {
      peerInstance.current.on("call", (call) => {
        
        setVideoScreen(true);
        setShowHeader(true);
        setIncomingCall(false);

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          // will set current users video stream
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          call.answer(mediaStream);
          call.on("stream", (remoteStream) => {
            // will set other users video stream
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });
    }
  }, [peerInstance]);

  // to load received chat real time and set typing status real time
  useEffect(() => {
    if (socket.current !== undefined) {
      socket.current.on("receive-message", (data) => {
        dispatch(updateCurrentChat(data));
        dispatch(loadCurrentContacts());
        if (data.type === "image")
          dispatch(getImagesArray(receiverDetails.chatid));
        if (data.type === "document")
          dispatch(getDocumentsArray(receiverDetails.chatid));
      });

      socket.current.on("receiver-typing", (data) => {
        setreceivertyping(true);
      });

      socket.current.on("receiver-stops-typing", (data) => {
        setreceivertyping(false);
      });

      socket.current.on("incoming-call", (data) => {
        setShowHeader(false);
        setIncomingCall(true);
      });

      socket.current.on("call-cancled", (data) => {
        setIncomingCall(false);
        setShowHeader(true);
      });

      socket.current.on("call-rejected", (data) => {
        setTimeout(() => {
          setCallRejected(false);
          setShowHeader(true);
        }, 1500);

        setCalling(false);
        setCallRejected(true);
      });

      socket.current.on("call-Accepted", (data) => {
        
        setVideoScreen(true);
        setCalling(false);
        setShowHeader(true);

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          const call = peerInstance.current.call(data.peerid, mediaStream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });

      socket.current.on("call-Hanged", (data) => {
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          mediaStream.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
              track.stop();
            }
          });
        });

        setVideoScreen(false);
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


  // to implement lazy loading and infinite scrolling functionality
  const handleScroll = (e) => {
    if (
      // (e.target.scrollHeight + e.target.scrollTop) - 1 === e.target.clientHeight
      Math.ceil(e.target.scrollHeight + e.target.scrollTop) -
      Math.floor(e.target.clientHeight) <= 1
    ) {
      
      // will load next 25 messages
      dispatch(loadCurrentChat(receiverDetails.chatid, lastChatNum, 25));
      setLastChatNum(lastChatNum + 25);
    }
  };

  /* it will get time difference between 2 messages and if it is less than 1 min 
   then it will return true which means message or media should be rounded */
  const getTimeDifference = (index,subArray) => {
    if (index === 0) {
      return false;
    } else if (
      subArray[index].senderid !==
      subArray[index - 1].senderid
    ) {
      return false;
    } else {
      if (
        (Number(subArray[index - 1].timestamp) -
          Number(subArray[index].timestamp)) /
          60000 <
        1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("user-typing", receiverDetails.userid);
  };

  const keyUpHandler = () => {
    socket.current.emit("user-stops-typing", receiverDetails.userid);
  };

  const keyDownHandler=(e)=>{
    if(e.keyCode==13){sendMessage()}
  }

  const sendMessage = () => {
    if (newMessage !== "") UpdateChat("message", {}, "");
    setNewMessage("");
  };

  const setImage = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) return;

    e.target.value = null;

    setDisplaySelectedImage(URL.createObjectURL(fileObj));
    setSelectedImage(fileObj);
    setAttachmentToggle(false);
    setMediaToggle(true);
  };

  const setDocument = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) return;

    e.target.value = null;

    let documentDetails = {
      documentName: fileObj.name,
      documentSize: getSize(fileObj.size),
      documentExtention: fileObj.name.split(".").pop(),
    };

    setDocumentBody(fileObj);
    setSelectedDocument(documentDetails);
    setDocumentToggle(true);
    setAttachmentToggle(false);
  };

  const getSize = (bytes) => {
    if (bytes < 1000) {
      return `${bytes} B`;
    } else if (bytes > 1000 && bytes < 1000 * 1024) {
      return `${Math.floor(bytes / 1024)} KB`;
    } else if (bytes > 1000 * 1024) {
      return `${Math.floor(bytes / (1000 * 1024))} MB`;
    } else {
      return "";
    }
  };

  const sendImage = () => {
    let nameArray = selectedImage.name.split(".");

    let key = `${nameArray[0]}_ ${Date.now()}.${nameArray[1]}`;

    // to upload image in aws
    const params = {
      ACL: "public-read",
      Body: selectedImage,
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: key,
      ContentType: "image/png",
    };

    myBucket.putObject(params).send((err, data) => {
      if (err) console.log(err);
    });

    setimgMessage("");
    setSelectedImage("");
    setDisplaySelectedImage("");
    setMediaToggle(false);
    UpdateChat("image", {}, key);

    // will update the images array to show uploaded image in media section
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/updateimagesarray`, {
        chatid: receiverDetails.chatid,
        key: key,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // will get updated image array through redux in real time
          dispatch(getImagesArray(receiverDetails.chatid));
        }
      });
  };

  const sendDocument = () => {
    let nameArray = selectedDocument.documentName.split(".");

    let key = `${nameArray[0]}_ ${Date.now()}.${nameArray[1]}`;

    // to upload document in aws
    const params = {
      ACL: "public-read",
      Body: documentBody,
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: key,
    };

    myBucket.putObject(params).send((err, data) => {
      if (err) console.log(err);
    });

    UpdateChat("document", selectedDocument, key);
    setDocumentBody("");
    setDocumentToggle(false);

    // will update the documents array to show uploaded image in media section
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/updatedocumentsarray`, {
        chatid: receiverDetails.chatid,
        key: key,
        name: selectedDocument.documentName,
        size: selectedDocument.documentSize,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // will get updated image array through redux in real time
          dispatch(getDocumentsArray(receiverDetails.chatid));
        }
      });

    setSelectedDocument({});
  };

  const closeHandler = () => {
    setimgMessage("");
    setSelectedImage("");
    setDisplaySelectedImage("");
    setSelectedDocument({});
    setDocumentBody("");
    setMediaToggle(false);
    setDocumentToggle(false);
  };

  const callUser = (callType) => {
    setShowHeader(false);
    setCalling(true);

    socket.current.emit("call-user", {
      userid: receiverDetails.userid,
      callType,
    });
  };

  const cancleCalling = () => {
    socket.current.emit("cancle-call", { userid: receiverDetails.userid });
    setShowHeader(true);
    setCalling(false);
  };

  const rejectIncomingCall = () => {
    socket.current.emit("reject-incoming-call", {
      userid: receiverDetails.userid,
    });
    setIncomingCall(false);
    setShowHeader(true);
  };

  const AnswerCall = () => {
    socket.current.emit("accept-incoming-call", {
      userid: receiverDetails.userid,
      peerid: peerId,
    });
  };

  const HangCall = () => {
    socket.current.emit("hang-call", {
      userid: receiverDetails.userid,
      peerid: peerId,
    });

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      mediaStream.getTracks().forEach(function (track) {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    });

    setVideoScreen(false);
  };

  const UpdateChat = async (messageType, selectedDocument, key) => {
    //For set chats order based on last sent message
    var updateOrder = false;
    var order = 0;
    let lastChatId = JSON.parse(localStorage.getItem("order"))[0];

    if (lastChatId === "") {
      localStorage.setItem(
        "order",
        JSON.stringify([receiverDetails.userid, 1])
      );
      updateOrder = true;
      order = 1;
    } else if (lastChatId !== receiverDetails.userid) {
      updateOrder = true;
      order = JSON.parse(localStorage.getItem("order"))[1] + 1;
      localStorage.setItem(
        "order",
        JSON.stringify([receiverDetails.userid, order])
      );
    }

    // send message to backend
    let messagePayload = {
      type: messageType,
      senderid: localStorage.getItem("userid"),
      receiverid: receiverDetails.userid,
      chatid: receiverDetails.chatid,
      updateOrder: updateOrder,
      order: order,
    };

    if (messageType === "message") {
      messagePayload.message = CryptoJS.AES.encrypt(
        newMessage,
        process.env.REACT_APP_MESSAGE_SECRET_KEY
      ).toString();
    } else if (messageType === "image") {
      messagePayload.message = CryptoJS.AES.encrypt(
        imgMessage,
        process.env.REACT_APP_MESSAGE_SECRET_KEY
      ).toString();
      messagePayload.key = key;
    } else if (messageType === "document") {
      messagePayload.message = selectedDocument;
      messagePayload.key = key;
    }

    new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.REACT_APP_SERVER}/chat/updatemessagearray`,
          messagePayload
        )
        .then((res) => {
          if (res.data.message) {
            socket.current.emit("send-message", res.data);
            dispatch(updateCurrentChat(res.data));
            dispatch(loadCurrentContacts());

            // When Chat Creater Initiate First Chat
            if (!SingleChatInfo.senderaddedtoreceiver) resolve();
          }
        });
    })
      .then(() => {
        axios
          .post(`${process.env.REACT_APP_SERVER}/chat/addSenderToReceiver`, {
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
          });
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };



  return (
    <div className="single-main-container">
      {showHeader && (
        <header className="single-chat-header">
          <div className="single-header-leftbar">
            <div className="single-header-logo">
              <img
                src={
                  receiverDetails.profileImg === ""
                    ? singleHeaderImg
                    : `${
                        process.env.REACT_APP_AWS_BUCKET_PATH
                      }${encodeURIComponent(receiverDetails.profileImg)}`
                }
                alt="chat-logo"
              ></img>
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
            <div
              className="right-icons video-call-single"
              onClick={() => callUser("video")}
            >
              <img src={videoCall} alt="video-call"></img>
            </div>
            {/* <div className="right-icons" onClick={() => callUser('audio')}>
              <img src={audioCall} alt="audio-call"></img>
            </div> */}
            {/* <div className="right-icons ">
              <img src={search} alt="search"></img>
            </div> */}
          </div>
        </header>
      )}

      {incomingCall && (
        <header className="single-calling-header">
          <div className="loading-line"></div>
          <div className="someone-calling">
            <div style={{ display: "flex", alignItems: "center" }}>
              {receiverDetails.username} is Calling&nbsp;&nbsp;&nbsp;
              <div class="dot-flashing-white"></div>
            </div>
          </div>
          <div className="action-buttons">
            <button
              className="action-button accept-button"
              onClick={AnswerCall}
            >
              <div className="call-images">
                <img src={callAccept} alt=""></img>
              </div>
              Accept
            </button>
            <button
              className="action-button reject-button"
              onClick={rejectIncomingCall}
            >
              <div className="reject">
                <img src={callreject} alt=""></img>
              </div>
              Reject
            </button>
          </div>
        </header>
      )}

      {calling && (
        <header className="self-calling-header">
          <div className="loading-line"></div>
          <div className="calling">
            <div style={{ display: "flex", alignItems: "center" }}>
              Calling {receiverDetails.username}&nbsp;&nbsp;&nbsp;
              <div class="dot-flashing"></div>
            </div>
          </div>
          <div className="action-buttons">
            <button
              className="action-button reject-button pulse"
              onClick={cancleCalling}
            >
              <div className="reject">
                <img src={callreject} alt=""></img>
              </div>
              Cancel
            </button>
          </div>
        </header>
      )}

      {callRejected && (
        <header className="call-rejected">
          <div className="someone-calling">Call Rejected...</div>
        </header>
      )}

      {showVideoScreen && (
        <div className="Video-Container">
          <div className="Receiver-Screen">
            {" "}
            <video ref={currentUserVideoRef} />
            <div className="sender-screen">
              {" "}
              <video ref={remoteVideoRef} />{" "}
            </div>
          </div>
          <div>
            <button className="hang" onClick={HangCall}>
              <img src={hang} alt="hang"></img>hang
            </button>
          </div>
        </div>
      )}
      {/* <VideoScreen /> */}

      {/* Main - section  */}

      <section className="single-main-section" onScroll={handleScroll}>
 
        {console.clear()}
        {console.log(SingleChatMessageArray)}
        {getFilteredMessageArrayDayWise(SingleChatMessageArray).map((dayObj) => {
          return (
            <>
              <fieldset className="day-container">
                <legend> {dayObj.label} </legend>
                {dayObj.messageArray.map((message, i) => {
                  if (message.senderid === receiverDetails.userid) {
                    return (
                      <ReceivedMessages
                        messagetype={message.type}
                        payload={message}
                        chatid={receiverDetails.chatid}
                        contactid={receiverDetails.userid}
                        shouldBeRound={getTimeDifference(i,dayObj.messageArray)}
                      />
                    );
                  } else {
                    return (
                      <SentMessages
                        messagetype={message.type}
                        payload={message}
                        chatid={receiverDetails.chatid}
                        contactid={receiverDetails.userid}
                        shouldBeRound={getTimeDifference(i,dayObj.messageArray)}
                      />
                    );
                  }
                })}
              </fieldset>
            </>
          );
        })}
      </section>

      {/* Footer */}

      <footer className="single-chat-footer">
        {/* add attachment popup */}
        {showAttachment && (
          <div className={"single-attachment"}>
            <div
              className="single-image-attachment"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <div className="single-attachment-icon">
                <img src={imageAttachment} alt="img-attachment"></img>
              </div>
              <div className="single-attachment-text">Images</div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                accept="image/*"
                alt="select-image"
                onChange={setImage}
              />
            </div>
            <div
              className="single-image-attachment"
              onClick={() => {
                inputDocumentRef.current.click();
              }}
            >
              <div className="single-attachment-icon">
                <img src={documentAttachment} alt="img-attachment"></img>
              </div>
              <div className="single-attachment-text">Documents</div>
              <input
                style={{ display: "none" }}
                ref={inputDocumentRef}
                type="file"
                alt="select-image"
                onChange={setDocument}
              />
            </div>
          </div>
        )}

        {/* Send Media Popup    */}
        {showMediaScreen && (
          <div className={"send-media-screen "}>
            <div className="image-close" onClick={closeHandler}>
              <img src={crossWhite} alt=""></img>
            </div>
            <div className="display-image-single-send">
              <img src={displaySelectedImage} alt=""></img>
            </div>
            <div className="image-message">
              <input
                type="text"
                placeholder="Type a Message...."
                value={imgMessage}
                onChange={(e) => {
                  setimgMessage(e.target.value);
                }}
              ></input>
              <div className="img-send" onClick={sendImage}>
                <img src={sendMedia} alt=""></img>
              </div>
            </div>
          </div>
        )}

        {/* Send Document Popuo */}
        <div
          className={"send-media-screen " + (!showDocumentScreen ? "hide" : "")}
        >
          <div className="document-header">
            <div className="no-preview">{selectedDocument.documentName}</div>
            <div className="image-close" onClick={closeHandler}>
              <img src={crossWhite} alt=""></img>
            </div>
          </div>
          <div className="display-image-single-send">
            <div>
              <img src={previewImage} alt="preview"></img>
            </div>
            <div className="no-preview">No Preview Available</div>
            <div className="preview-info">
              {selectedDocument.documentSize}-
              {selectedDocument.documentExtention}
            </div>
          </div>
          <div className="image-message additional">
            <div className="img-send" onClick={sendDocument}>
              <img src={sendMedia} alt=""></img>
            </div>
          </div>
        </div>

        {/* Actual footer */}
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
            placeholder={
              "write a message for " +
              (receiverDetails !== undefined ? receiverDetails.username : "") +
              "..."
            }
            onChange={typingHandler}
            onKeyUp={useDebouncedCallback(keyUpHandler, 1500)}
            onKeyDown={keyDownHandler}
          ></input>
        </div>

        <div className="single-footer-right-icons">
          {/* <InputEmoji /> */}
          {/* <Picker pickerStyle={{}} /> */}

          {/* <div className="single-footer-right-icon">
            <img src={emoji} alt="emoji"></img>
          </div> */}
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
