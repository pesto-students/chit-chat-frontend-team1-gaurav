/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useRef } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import ReceivedMessages from "./CommonComponents/ReceivedMessages";
import SentMessages from "./CommonComponents/SentMessages";
import groupHeaderImg from "Assets/group-header-img.png";
import search from "Assets/search.png";
import audioCall from "Assets/audio-call.png";
import videoCall from "Assets/videocallchat.png";
import inviteMember from "Assets/invite-member.png";
import attachment from "Assets/attachment.png";
import send from "Assets/send.png";
import emoji from "Assets/emoji.png";
import imageAttachment from "Assets/image-attachment.png";
import documentAttachment from "Assets/document-attachment.png";
import crossWhite from "Assets/cross-white.png";
import { useSelector, useDispatch } from "react-redux";
import previewImage from 'Assets/preview.png';
import sendMedia from "Assets/send-media.png";
import { updateMessageArray,loadCurrentGroups } from "Redux/Actions/GroupChatActions";
import "./GroupChatScreen.css";

toast.configure();

function GroupChatScreen({ socket }) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const inputDocumentRef = useRef(null);

  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const { receiverGroupDetails, GroupChatMessageArray } = groupDetails;

  const [showAttachment, setAttachmentToggle] = useState(false);
  const [issomeonetyping, setsomeonetyping] = useState(false); 
  const [showMediaScreen, setMediaToggle] = useState(false);
  const [showDocumentScreen, setDocumentToggle] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [imgMessage, setimgMessage] = useState("");
  const [membersarray, setmembersarray] = useState("");
  const [typinguser, setTypingUser] = useState("");
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState({});

  useEffect(() => {
    var membersarray = receiverGroupDetails.groupmembersarray.map((item) => {
      return item.userid;
    });

    setmembersarray(membersarray);
    
  }, []);

  useEffect(() => {
    
    socket.current.on("receive-message-to-group", (data) => {
      if(membersarray.includes(data.senderid))
      dispatch(updateMessageArray(data));
    });

    socket.current.on("someone-typing-in-group", (data) => {
    
      receiverGroupDetails.groupmembersarray.map((user) => {
        if (user.userid === data) {
          setTypingUser(user.username);
          setsomeonetyping(true);
        }
      });
    });

    socket.current.on("stops-typing-in-group", (data) => {
      setTypingUser('');
      setsomeonetyping(false);
    });
  }, [socket]);


  const getTimeDifference = (index) => {

    if(index === 0){
      return false;
    }
    else{
      if(((Number(GroupChatMessageArray[index-1].timestamp) - Number(GroupChatMessageArray[index].timestamp))/60000) < 1){
        return true;
      }
      else{
        return false;
      }
    }

  }

  const sendMessage = () => {
    if(newMessage !== '')
    UpdateChat("message",{});
    setNewMessage(""); 
  };


  const setImage = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj)
      return;

    e.target.value = null;

    setSelectedImage(URL.createObjectURL(fileObj));
    setAttachmentToggle(false);
    setMediaToggle(true);

  }

  const setDocument = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj)
      return;

    e.target.value = null;


    let documentDetails = {

      documentName:fileObj.name,
      documentSize:getSize(fileObj.size),
      documentExtention:fileObj.name.split('.').pop()

    }

      setSelectedDocument(documentDetails);
      setDocumentToggle(true);
      setAttachmentToggle(false);

  }

  const getSize = (bytes) => {
    if(bytes < 1000){
      return `${bytes} B`;
    }
    else if(bytes > 1000 && bytes < (1000*1024))
    {
      return `${Math.floor(bytes/1024)} KB`;
    }
    else if(bytes > (1000*1024)){
      return `${Math.floor(bytes/(1000*1024))} MB`;
    }
    else{
      return '';
    }
  }

  const sendImage = () => {
    setimgMessage("");
    setSelectedImage("");
    setMediaToggle(false);
    UpdateChat("image",{});
  };

  const sendDocument = () => {
    UpdateChat("document",selectedDocument);
    setSelectedDocument({});
    setDocumentToggle(false);
  };


  const closeHandler = () =>{
    setimgMessage("");
    setSelectedImage("");
    setSelectedDocument({});
    setMediaToggle(false);
    setDocumentToggle(false);
  }

  const typingHandler = (e) => {
    
    setNewMessage(e.target.value);
    socket.current.emit("user-typing-in-group", {userid:localStorage.getItem("userid"),groupid:receiverGroupDetails.groupid});
  };



  const keyUpHandler = () => {
    socket.current.emit(
      "user-stops-typing-in-group",
      receiverGroupDetails.groupid
    );
  };



  const UpdateChat = async (messageType,selectedDocument) => {
    

    var updateOrder = false;
    var order = 0;

    let orderVar = JSON.parse(localStorage.getItem("grouporder"))[0];

    if (orderVar === "") {
      localStorage.setItem(
        "grouporder",
        JSON.stringify([receiverGroupDetails.groupid, 1])
      );
      updateOrder = true;
      order = 1;
    } else if (orderVar !== receiverGroupDetails.groupid) {
      updateOrder = true;
      order = JSON.parse(localStorage.getItem("grouporder"))[1] + 1;
      localStorage.setItem(
        "grouporder",
        JSON.stringify([receiverGroupDetails.groupid, order])
      );
    }

    let messagePayload = {
      messageid: Math.random().toString(16).slice(2),  
      type: messageType,
      senderid: localStorage.getItem("userid"),
      groupid: receiverGroupDetails.groupid,
      updateOrder: updateOrder,
      order: order,
      starmarked: false,
    };

    if(messageType === 'message'){
      messagePayload.message = CryptoJS.AES.encrypt(newMessage,'dhruvin').toString();
      messagePayload.url = '';
    }
    else if(messageType === 'image'){
      messagePayload.message = CryptoJS.AES.encrypt(imgMessage,'dhruvin').toString();
      messagePayload.url = "Assets/send-media.png";
    }
    else if(messageType === 'document'){
      messagePayload.message = selectedDocument;
      messagePayload.url = "Assets/send-media.png";
    }


    axios
      .post(
        "http://localhost:5000/group/updategroupmessagearray",
        messagePayload
      )
      .then((res) => {
        if (res.data.message) {

          setNewMessage("");
          res.data.groupid = receiverGroupDetails.groupid;
          socket.current.emit("send-message-to-group", res.data);
          dispatch(updateMessageArray(res.data));
          dispatch(loadCurrentGroups());


        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

 
  return (
    <div className="group-main-container">
      {/* Header */}

      <header className="group-chat-header">
        <div className="group-header-leftbar">
          <div className="group-header-logo">
            <img src={groupHeaderImg} alt="chat-logo"></img>
          </div>
          <div className="group-header-info">
            <h1 className="group-person-name">
              {receiverGroupDetails.groupname}
            </h1>
            {issomeonetyping ? (
              <div className="typing " style={{ marginTop: ".5vh" }}>
                {typinguser} is typing...
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="group-header-icons">
          <div className="right-icons">
            <img src={inviteMember} alt="invite-member"></img>
          </div>
          <div className="right-icons video-call-group">
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

      <section className="group-main-section">


        <fieldset className="day-container">
          {GroupChatMessageArray
            .map((message,i) => {
              if (membersarray.includes(message.senderid)) {
                return (
                  <ReceivedMessages
                  messagetype={message.type}
                  payload={message}
                  shouldBeRound={getTimeDifference(i)}
                  />
                );
              } else {
                return (
                  <SentMessages
                    messagetype={message.type}
                    payload={message}
                    shouldBeRound={getTimeDifference(i)}
                  />
                );
              }
            })
          }
        </fieldset>
         
             
      </section>

      {/* Footer */}

      <footer className="group-chat-footer">
        <div className={"group-attachment " + (!showAttachment ? "hide" : "")}>
          <div className="group-image-attachment" onClick={() => {inputRef.current.click();}}>
            <div className="group-attachment-icon">
              <img src={imageAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Photo or Video</div>
            <input style={{display: 'none'}} ref={inputRef} type="file" alt="select-image" onChange={setImage} />
          </div>
          <div className="group-image-attachment" onClick={() => {inputDocumentRef.current.click();}}>
            <div className="group-attachment-icon">
              <img src={documentAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Documents</div>
            <input style={{display: 'none'}} ref={inputDocumentRef} type="file" alt="select-image" onChange={setDocument} />
          </div>
        </div>



               {/* Send Media Popup    */}
        <div className={"send-media-screen " + (!showMediaScreen ? "hide" : "")}>
          <div className="image-close" onClick={closeHandler} >
            <img src={crossWhite} alt="" ></img>
          </div>
          <div className="display-image-single-send">
            <img src={selectedImage} alt=""></img>
          </div>
          <div className="image-message">
            <input type="text" placeholder="Type a Message...." value={imgMessage} onChange={(e) => {setimgMessage(e.target.value); }} ></input>
            <div className="img-send" onClick={sendImage}>
              <img src={sendMedia} alt=""></img>
            </div>
          </div>
        </div>

            {/* Send Document Popuo */}
        <div className={"send-media-screen " + (!showDocumentScreen ? "hide" : "")}>
          <div className="document-header">
            <div className="no-preview">{selectedDocument.documentName}</div>
            <div className="image-close" onClick={closeHandler} ><img src={crossWhite} alt="" ></img></div>
          </div>
          <div className="display-image-single-send">
            <div ><img src={previewImage} alt="preview"></img></div>
            <div className="no-preview">No Preview Available</div>
            <div className="preview-info">{selectedDocument.documentSize}-{selectedDocument.documentExtention}</div>
          </div>
          <div className="image-message additional">
            <div className="img-send" onClick={sendDocument}>
              <img src={sendMedia} alt=""></img>
            </div>
          </div>
        </div>



        <div
          className="group-attach-icon"
          onClick={() => {
            setAttachmentToggle(!showAttachment);
          }}
        >
          <img src={attachment} alt="attach"></img>
        </div>

        <div className="group-footer-message">
          <input
            type="text"
            value={newMessage}
            onChange={typingHandler}
            onKeyUp={useDebouncedCallback(keyUpHandler, 1500)}
            placeholder="write a message for peter..."
          ></input>
        </div>

        <div className="group-footer-right-icons">
          <div className="group-footer-right-icon">
            <img src={emoji} alt="emoji"></img>
          </div>
          <div className="group-footer-right-icon" onClick={sendMessage}>
            <img src={send} alt="send"></img>
          </div>
          {/* <div className='group-footer-right-icon'><img src={roundsend} alt="send"></img></div> */}
        </div>

        <div className="group-right-footer"></div>
      </footer>
    </div>
  );
}

export default GroupChatScreen;
