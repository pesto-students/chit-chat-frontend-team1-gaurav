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
import AddParticipant from "../../AddParticipant/AddParticipant";
import { useSelector, useDispatch } from "react-redux";
import { updateMessageArray,loadCurrentGroups } from "Redux/Actions/GroupChatActions";
import "./GroupChatScreen.css";

toast.configure();

function GroupChatScreen({ socket }) {
  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const { receiverGroupDetails, GroupChatMessageArray } = groupDetails;

  console.log('check',receiverGroupDetails);

  const [showAttachment, setAttachmentToggle] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [imgMessage, setimgMessage] = useState("");
  const [membersarray, setmembersarray] = useState("");
  const [issomeonetyping, setsomeonetyping] = useState(false);
  const [typinguser, setTypingUser] = useState("");

  const [showPopup,setShowPopup]=useState(false);

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

  const UpdateChat = async (messageType) => {
    

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
      type: messageType,
      messageid: Math.random().toString(16).slice(2),
      message:
        messageType === "message"
          ? CryptoJS.AES.encrypt(newMessage, "dhruvin").toString()
          : CryptoJS.AES.encrypt(imgMessage, "dhruvin").toString(),

      senderid: localStorage.getItem("userid"),
      groupid: receiverGroupDetails.groupid,
      updateOrder: updateOrder,
      order: order,
      starmarked: false,
      url: messageType === "image" ? "Assets/send-media.png" : "",
    };

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

  const typingHandler = (e) => {
    
    setNewMessage(e.target.value);
    socket.current.emit("user-typing-in-group", {userid:localStorage.getItem("userid"),groupid:receiverGroupDetails.groupid});
  };

  const sendMessage = () => {
    if(newMessage !== '')
    UpdateChat("message");
  };

  const keyUpHandler = () => {
    socket.current.emit(
      "user-stops-typing-in-group",
      receiverGroupDetails.groupid
    );
  };

  const addParticipantHandler=()=>{
       setShowPopup(true)
  }

  return (
    <div style={{position:'relative'}} className="group-main-container">
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
            <img onClick={addParticipantHandler} src={inviteMember} alt="invite-member"></img>
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
          <div className="group-image-attachment">
            <div className="group-attachment-icon">
              <img src={imageAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Photo or Video</div>
          </div>
          <div className="group-image-attachment">
            <div className="group-attachment-icon">
              <img src={documentAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Documents</div>
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
      {showPopup && <AddParticipant groupid={receiverGroupDetails.groupid} setShowPopup={setShowPopup}/>}
    </div>
  );
}

export default GroupChatScreen;
