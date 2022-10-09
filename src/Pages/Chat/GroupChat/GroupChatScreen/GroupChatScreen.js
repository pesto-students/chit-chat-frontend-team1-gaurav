/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
import { useDebouncedCallback } from "use-debounce";
import ReceivedMessages from "./CommonComponents/ReceivedMessages";
import SentMessages from "./CommonComponents/SentMessages";
import { getFilteredMessageArrayDayWise } from "Common/Common";
import groupPic from "Assets/group-icon.png";
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
import AddParticipant from "./CommonComponents/AddParticipant";
import { useSelector, useDispatch } from "react-redux";
import previewImage from "Assets/preview.png";
import sendMedia from "Assets/send-media.png";
import {
  updateMessageArray,
  loadCurrentGroups,
  loadCurrentGroupChat,
  getGroupImagesArray,
  getGroupDocumentsArray,
} from "Redux/Actions/GroupChatActions";
import "./GroupChatScreen.css";

toast.configure();

function GroupChatScreen({ socket }) {
  // aws config for uploading content
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
  const [selectedImage, setSelectedImage] = useState("");
  const [displaySelectedImage, setDisplaySelectedImage] = useState("");
  const [selectedDocument, setSelectedDocument] = useState({});
  const [documentBody, setDocumentBody] = useState({});
  const [lastChatNum, setLastChatNum] = useState(25);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    var membersarray = receiverGroupDetails.groupmembersarray.map((item) => {
      return item.userid;
    });

    setmembersarray(membersarray);
  }, []);

  useEffect(() => {
    if (socket.current !== undefined) {
      socket.current.on("receive-message-to-group", (data) => {
          dispatch(updateMessageArray(data));
          dispatch(loadCurrentGroups());
          if (data.type === "image")
          dispatch(getGroupImagesArray(receiverGroupDetails.groupid));
          if (data.type === "document")
          dispatch(getGroupDocumentsArray(receiverGroupDetails.groupid));

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
        setTypingUser("");
        setsomeonetyping(false);
      });
    }
  }, [socket]);

  // to impelment lazy loading and infinite scrolling in chat loading
  const handleScroll = (e) => {
    if (
      // (Math.floor(e.target.scrollHeight + e.target.scrollTop) - 1) === (Math.floor(e.target.clientHeight))
      Math.floor(e.target.scrollHeight + e.target.scrollTop) ===
      Math.floor(e.target.clientHeight)
      // Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
      ) {
        dispatch(
          // it will load next 25 messages
          loadCurrentGroupChat(receiverGroupDetails.groupid, lastChatNum, 25)
        );
        setLastChatNum(lastChatNum + 25);
      }
    };

  /* it will get time difference between 2 messages and if it is less than 1 min 
   then it will return true which means message or media should be rounded */
  const getTimeDifference = (index,subArr) => {
    if (index === 0) {
      return false;
    } else if (
      subArr[index].senderid !==
      subArr[index - 1].senderid
    ) {
      return false;
    } else {
      if (
        (Number(subArr[index - 1].timestamp) -
          Number(subArr[index].timestamp)) /
          60000 <
        1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const sendMessage = () => {
    if (newMessage !== "") UpdateChat("message", {});
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

  // returns the size of document in B or MB or KB
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

    // upload image in aws
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
    // update message array in db as image object
    UpdateChat("image", {}, key);

    // will update the images array to show uploaded image in media section
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/updateimagesarray`, {
        groupid: receiverGroupDetails.groupid,
        key: key,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // will get updated image array through redux in real time
          dispatch(getGroupImagesArray(receiverGroupDetails.groupid));
        }
      });
  };

  const sendDocument = () => {
    let nameArray = selectedDocument.documentName.split(".");

    let key = `${nameArray[0]}_ ${Date.now()}.${nameArray[1]}`;

    const params = {
      ACL: "public-read",
      Body: documentBody,
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: key,
    };

    myBucket.putObject(params).send((err, data) => {
      if (err) console.log(err);
    });

    // update message array in db as document object
    UpdateChat("document", selectedDocument, key);
    setSelectedDocument({});
    setDocumentBody("");
    setDocumentToggle(false);

    // will update the documents array to show uploaded image in media section
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/updatedocumentsarray`, {
        groupid: receiverGroupDetails.groupid,
        key: key,
        name: selectedDocument.documentName,
        size: selectedDocument.documentSize,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // will get updated image array through redux in real time
          dispatch(getGroupDocumentsArray(receiverGroupDetails.groupid));
        }
      });

    setSelectedDocument({});
  };

  const closeHandler = () => {
    setimgMessage("");
    setSelectedImage("");
    setDisplaySelectedImage("");
    setDocumentBody("");
    setSelectedDocument({});
    setMediaToggle(false);
    setDocumentToggle(false);
  };

  // emits a event that let other user know that use is typing
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("user-typing-in-group", {
      userid: localStorage.getItem("userid"),
      groupid: receiverGroupDetails.groupid,
    });
  };

  const keyUpHandler = () => {
    socket.current.emit(
      "user-stops-typing-in-group",
      receiverGroupDetails.groupid
    );
  };

  const UpdateChat = async (messageType, selectedDocument, key) => {
    var updateOrder = false;
    var order = 0;

    let orderVar = JSON.parse(localStorage.getItem("grouporder"))[0];

    // to update the order of group contacts based on last conversation
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
      senderid: localStorage.getItem("userid"),
      groupid: receiverGroupDetails.groupid,
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

    axios
      .post(
        `${process.env.REACT_APP_SERVER}/group/updategroupmessagearray`,
        messagePayload
      )
      .then((res) => {
        if (res.data.message) {
          setNewMessage("");
          res.data.groupid = receiverGroupDetails.groupid;
          socket.current.emit("send-message-to-group", res.data);
          // dispatch(updateMessageArray(res.data));
          dispatch(loadCurrentGroups());
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

  const addParticipantHandler = () => {
    setShowPopup(true);
  };

  return (
    <div style={{ position: "relative" }} className="group-main-container">
      {/* Header */}

      <header className="group-chat-header">
        <div className="group-header-leftbar">
          <div className="group-header-logo">
            <img src={groupPic} alt="chat-logo"></img>
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
            <img
              onClick={addParticipantHandler}
              src={inviteMember}
              alt="invite-member"
            ></img>
          </div>
          {/* <div className="right-icons video-call-group">
            <img src={videoCall} alt="video-call"></img>
          </div>
          <div className="right-icons">
            <img src={audioCall} alt="audio-call"></img>
          </div>
          <div className="right-icons ">
            <img src={search} alt="search"></img>
          </div> */}
        </div>
      </header>

      {/* Main - section  */}

      <section className="group-main-section" onScroll={handleScroll}>
        {getFilteredMessageArrayDayWise(GroupChatMessageArray).map((dayObj) => {
          return (
            <>
              <fieldset className="day-container">
                <legend> {dayObj.label} </legend>

                {dayObj.messageArray.map((message,i) => {
                  if (membersarray.includes(message.senderid)) {
                    return (
                      <ReceivedMessages
                        messagetype={message.type}
                        payload={message}
                        groupid={receiverGroupDetails.groupid}
                        shouldBeRound={getTimeDifference(i,dayObj.messageArray)}
                      />
                    );
                  } else {
                    return (
                      <SentMessages
                        messagetype={message.type}
                        payload={message}
                        groupid={receiverGroupDetails.groupid}
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

      <footer className="group-chat-footer">
        <div className={"group-attachment " + (!showAttachment ? "hide" : "")}>
          <div
            className="group-image-attachment"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <div className="group-attachment-icon">
              <img src={imageAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Images</div>
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
            className="group-image-attachment"
            onClick={() => {
              inputDocumentRef.current.click();
            }}
          >
            <div className="group-attachment-icon">
              <img src={documentAttachment} alt="img-attachment"></img>
            </div>
            <div className="group-attachment-text">Documents</div>
            <input
              style={{ display: "none" }}
              ref={inputDocumentRef}
              type="file"
              alt="select-image"
              onChange={setDocument}
            />
          </div>
        </div>

        {/* Send Media Popup    */}
        <div
          className={"send-media-screen " + (!showMediaScreen ? "hide" : "")}
        >
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
          {/* <div className="group-footer-right-icon">
            <img src={emoji} alt="emoji"></img>
          </div> */}
          <div className="group-footer-right-icon" onClick={sendMessage}>
            <img src={send} alt="send"></img>
          </div>
          {/* <div className='group-footer-right-icon'><img src={roundsend} alt="send"></img></div> */}
        </div>

        <div className="group-right-footer"></div>
      </footer>
      {showPopup && (
        <AddParticipant
          groupid={receiverGroupDetails.groupid}
          setShowPopup={setShowPopup}
          groupMembers={receiverGroupDetails.groupmembersarray}
        />
      )}
    </div>
  );
}

export default GroupChatScreen;
