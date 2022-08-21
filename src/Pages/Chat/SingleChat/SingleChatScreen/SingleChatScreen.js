/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef } from "react";
import { toast } from "react-toastify";
import { Peer } from "peerjs";
import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from 'react-s3';
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
import previewImage from 'Assets/preview.png';
import "./SingleChatScreen.css";
import {
  updateChatInfo,
  loadCurrentContacts,
  updateCurrentChat,
  loadCurrentChat,resetMessageArray
} from "Redux/Actions/SingleChatActions";
window.Buffer = window.Buffer || require("buffer").Buffer;

toast.configure();

function SingleChatScreen({ socket }) {

  const config = {
    bucketName: 'chitchatcommunication',
    region: 'Asia Pacific (Mumbai) ap-south-1',
    accessKeyId: 'AKIAZVTSLHVBCOLPXRUK',
    secretAccessKey: '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',
}

  const dispatch = useDispatch();  

  const inputRef = useRef(null);
  const inputDocumentRef = useRef(null);
  const peerInstance=useRef(null);
  const currentUserVideoRef=useRef(null);
  const remoteVideoRef=useRef(null); 


  const [showAttachment, setAttachmentToggle] = useState(false);
  const [showMediaScreen, setMediaToggle] = useState(false);
  const [showDocumentScreen, setDocumentToggle] = useState(false);
  const [isuseronline, setuseronline] = useState(true);
  const [isreceivertyping, setreceivertyping] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [calling, setCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [showVideoScreen,setVideoScreen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [imgMessage, setimgMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState({});
  const [peerId,setPeerId]=useState('');
  const [lastChatNum,setLastChatNum] = useState(25);

  const state = useSelector((state) => state.SingleChatReducer);
  var { SingleChatMessageArray, SingleChatInfo, onlineUsers, receiverDetails } = state;
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozkitGetUserMedia

  // Checks if Receiver is online when we start conversation
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const peer=new Peer();

    peer.on('open',id=>{
      setPeerId(id);
    })

  peerInstance.current=peer;


    dispatch(resetMessageArray());
    dispatch(loadCurrentChat(receiverDetails.chatid,0,25));


    for (const user of onlineUsers) {
      if (user.userid === receiverDetails.userid) {
        setuseronline(true);
        return;
      } else {
        setuseronline(false);
      }
    };


  }, []);

  useEffect(() => {
    if(peerInstance.current !== null){

    peerInstance.current.on('call',call=>{
    
      setVideoScreen(true);
      setShowHeader(true);
      setIncomingCall(false);
      

      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozkitGetUserMedia
  
      getUserMedia({video:true,audio:true},mediaStream =>{
      currentUserVideoRef.current.srcObject=mediaStream;
      currentUserVideoRef.current.play();
  
      call.answer(mediaStream);
      call.on('stream',(remoteStream)=>{
        remoteVideoRef.current.srcObject=remoteStream;
        remoteVideoRef.current.play();
      })  
    })
    
    })
  }
  },[peerInstance])


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

   
        getUserMedia({video:true,audio:true},mediaStream =>{
          currentUserVideoRef.current.srcObject=mediaStream;
          currentUserVideoRef.current.play();
          
          const call = peerInstance.current.call(data.peerid, mediaStream)
          call.on('stream',(remoteStream)=>{
            remoteVideoRef.current.srcObject=remoteStream;
            remoteVideoRef.current.play();
          })
        })

     });

     socket.current.on('call-Hanged',(data) => {
      setVideoScreen(false);

     })

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


  const handleScroll  = (e) => {
   if((Math.floor(e.target.scrollHeight + e.target.scrollTop) - 1) === (Math.floor(e.target.clientHeight))){
      dispatch(loadCurrentChat(receiverDetails.chatid,lastChatNum,25));
      setLastChatNum(lastChatNum + 25);
   }

  }

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
    UpdateChat('message',{});
    setNewMessage(""); 
  }


  const setImage = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj)
      return;

    e.target.value = null;

    // setSelectedImage(URL.createObjectURL(fileObj));
    setSelectedImage(fileObj);
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
    
    uploadFile(selectedImage, config)
    .then(data =>{
      
       console.log(data)
    })
    .catch(err => {
      
      console.error(err)})

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

  const callUser = () => {

    setShowHeader(false);
    setCalling(true);
  
    socket.current.emit('call-user',{userid:receiverDetails.userid});

  }

  const cancleCalling = () => {
    socket.current.emit('cancle-call',{userid:receiverDetails.userid});
    setShowHeader(true);
    setCalling(false);
  }

  const rejectIncomingCall = () => {
    socket.current.emit('reject-incoming-call',{userid:receiverDetails.userid});
    setIncomingCall(false);
    setShowHeader(true);
  }


  const AnswerCall = () => {
    socket.current.emit('accept-incoming-call',{userid:receiverDetails.userid,peerid:peerId})
  }

  const HangCall = () => {
    socket.current.emit('hang-call',{userid:receiverDetails.userid,peerid:peerId});
    setVideoScreen(false);

  }

  const UpdateChat = async (messageType,selectedDocument) => {

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
      senderid: localStorage.getItem("userid"),
      receiverid: receiverDetails.userid,
      chatid: receiverDetails.chatid,
      updateOrder: updateOrder,
      order: order,
    };

    if(messageType === 'message'){
      messagePayload.message = CryptoJS.AES.encrypt(newMessage,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString();
    }
    else if(messageType === 'image'){
      messagePayload.message = CryptoJS.AES.encrypt(imgMessage,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString();
      messagePayload.url = "Assets/send-media.png";
    }
    else if(messageType === 'document'){
      messagePayload.message = selectedDocument;
      messagePayload.url = "Assets/send-media.png";
    }




    new Promise((resolve,reject) => {

      axios
      .post(`${process.env.REACT_APP_SERVER}/chat/updatemessagearray`, messagePayload)
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
          .post(`${process.env.REACT_APP_SERVER}/chat/addSenderToReceiver`, {
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


  // const filterChatDateWise = (chatArray) => {

  //   if(chatArray.length > 0){
  //   let firstDate = chatArray[0].timestamp;
  //   let lastDate = chatArray[chatArray.length - 1].timestamp;

  //   let hello;
  //   }

  // }


  return (
    <div className="single-main-container">


      {showHeader && <header className="single-chat-header">
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
          <div className="right-icons video-call-single" onClick={callUser}>
            <img src={videoCall} alt="video-call"></img>
          </div>
          <div className="right-icons">
            <img src={audioCall} alt="audio-call"></img>
          </div>
          <div className="right-icons ">
            <img src={search} alt="search"></img>
          </div>
        </div>
      </header>}

      {incomingCall && <header className="single-calling-header">
          <div className="someone-calling">{receiverDetails.username} is Calling...</div>
          <div className="action-buttons">
            <button className="action-button accept-button" onClick={AnswerCall}><div className="call-images"><img src={callAccept} alt=""></img></div>Accept</button>
            <button className="action-button reject-button" onClick={rejectIncomingCall}><div className="reject"><img src={callreject} alt=""></img></div>Reject</button>
          </div>
      </header>}


      {calling && <header className="self-calling-header">
          <div className="calling">Calling {receiverDetails.username}...</div>
          <div className="action-buttons">
            <button className="action-button reject-button pulse" onClick={cancleCalling}><div className="reject"><img src={callreject} alt=""></img></div>Cancel</button>
          </div>
         
      </header>}

      {callRejected && <header className="call-rejected">
          <div className="someone-calling">Call Rejected...</div>
       
      </header>}

    {showVideoScreen &&  <div className='Video-Container'>
         <div className='Receiver-Screen'>  <video ref={currentUserVideoRef}/>
            <div className='sender-screen'> <video ref={remoteVideoRef}/> </div>
        </div>
        <div><button className="hang" onClick={HangCall}><img src={hang} alt="hang"></img>hang</button></div>
    </div>}
    {/* <VideoScreen /> */}
        

      {/* Main - section  */}

      <section className="single-main-section" onScroll={handleScroll}>
        <fieldset className="day-container" >
          <legend > Yesterday </legend>
          {/* {filterChatDateWise(SingleChatMessageArray)} */}
          {SingleChatMessageArray.map((message,i) => {
              if (message.senderid === receiverDetails.userid) {
                return (
                  <ReceivedMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                    contactid={receiverDetails.userid}
                    shouldBeRound={getTimeDifference(i)}
                  />
                );
              } else {

                return (
                  <SentMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={receiverDetails.chatid}
                    contactid={receiverDetails.userid}
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
          <div className="single-image-attachment" onClick={() => {inputRef.current.click();}}>
            <div className="single-attachment-icon">
              <img src={imageAttachment} alt="img-attachment"></img>
            </div>
            <div className="single-attachment-text">Photo or Video</div>
            <input style={{display: 'none'}} ref={inputRef} type="file" alt="select-image" onChange={setImage} />
          </div>
          <div className="single-image-attachment" onClick={() => {inputDocumentRef.current.click();}}>
            <div className="single-attachment-icon">
              <img src={documentAttachment} alt="img-attachment"></img>
            </div>
            <div className="single-attachment-text">Documents</div>
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
            {/* <InputEmoji style={{display:'none'}}/> */}
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
