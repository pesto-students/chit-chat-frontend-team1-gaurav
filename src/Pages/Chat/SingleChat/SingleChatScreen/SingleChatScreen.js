/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import ReceivedMessages from './CommonComponents/ReceivedMessages'
import SentMessages from './CommonComponents/SentMessages'
import axios from 'axios';
import singleHeaderImg from "../../../../Assets/single-header-img.png";
import search  from "../../../../Assets/search.png";
import audioCall  from "../../../../Assets/audio-call.png";
import videoCall  from "../../../../Assets/videocallchat.png";
import attachment  from "../../../../Assets/attachment.png";
import send  from "../../../../Assets/send.png";
import emoji  from "../../../../Assets/emoji.png";
import imageAttachment  from "../../../../Assets/image-attachment.png";
import documentAttachment  from "../../../../Assets/document-attachment.png";
import "./SingleChatScreen.css";

function SingleChatScreen({userdetails,socket,receivedonlineusers}) {

  const [showAttachment,setAttachmentToggle] = useState(false);
  const[onlineusers,setonlineusers] = useState(receivedonlineusers);
  const[isuseronline,setuseronline] = useState(false);
  const[messageArray,setMessageArray] = useState([]);
  const[newMessage,setNewMessage] = useState('');

  useEffect(()=>{
    debugger;
    axios
    .post("http://localhost:5000/chat/loadchat",{
      chatid:userdetails.chatid
    })
    .then((res) => {
      debugger
      setMessageArray(res.data);
    })
    .catch((err) => {
      
      // toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
    });

    for (const user of receivedonlineusers) {
        if(user.userid === userdetails.userid){
          setuseronline(true);
          return;
        }
        else{
          setuseronline(false);
        }
    }
  },[])



  useEffect(()=>{
    socket.current.on("online-users", (data) => {
      setonlineusers(data);
    });

    socket.current.on("receive-message", (data) => {

      let newMessagearray = messageArray.push(data);
      setMessageArray(newMessagearray);

    });

  },[socket])



  useEffect(()=>{
    for (const user of onlineusers) {
        if(user.userid === userdetails.userid){
          setuseronline(true);
        }
        else{
          setuseronline(false);
        }
    }
  },[onlineusers])



  const sendMessage =() =>{
debugger;
    let messagePayload = {
          type:'message',
          message:newMessage,
          senderid:localStorage.getItem('userid'),
          receiverid:userdetails.userid,
          chatid:userdetails.chatid
    }

    axios
      .post("http://localhost:5000/chat/updatemessagearray",messagePayload)
      .then((res) => {
        debugger;
          if(res.data.message){
            socket.current.emit('send-message',res.data);

            messageArray.push(res.data);
            setMessageArray(messageArray);
            setNewMessage('')

          }
      })
      .catch((err) => {
        
        // toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });

  }


  return (
    <div className='single-main-container'>


        <header className='single-chat-header'>
            <div className='single-header-leftbar'>
                <div className='single-header-logo'>
                    <img src={singleHeaderImg} alt='chat-logo'></img>
                </div>
                <div className='single-header-info'>
                  <h1 className='single-person-name'>{userdetails.username}</h1>
                  <div className='single-status'>
                      <span class={"single-status-dot " + (isuseronline?'':'ofline')}></span>
                      <div className='single-status-name'>{isuseronline?'Online':'Ofline'}</div>
                  </div>
                </div>
            </div>

            <div className='single-header-icons'>

              <div className='right-icons video-call-single'><img src={videoCall} alt="video-call"></img></div>
              <div className='right-icons'><img src={audioCall} alt="audio-call"></img></div>
              <div className='right-icons '><img src={search} alt="search"></img></div>
              
            </div>
        </header>

{/* Main - section  */}


        <section className='single-main-section'>
    
            <fieldset className='day-container'>
              <legend> Yesterday </legend>

             {
                messageArray.map(message =>{
                  if(message.senderid === userdetails.userid){
                    if(message.type === 'message' && false)
                    return <ReceivedMessages messagetype='normal-message' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <ReceivedMessages messagetype='last-received-message' payload={message.message}/>

                    if(message.type === 'image' && false)
                    return <ReceivedMessages messagetype='noramal-image' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <ReceivedMessages messagetype='last-received-image' payload={message.message}/>

                    if(message.type === 'document' && false)
                    return <ReceivedMessages messagetype='normal-document' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <ReceivedMessages messagetype='last-received-document' payload={message.message}/>

                  }else{

                    if(message.type === 'message' && false)
                    return <SentMessages messagetype='normal-message' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <SentMessages messagetype='last-sent-message' payload={message.message}/>

                    if(message.type === 'image' && false)
                    return <SentMessages messagetype='noramal-image' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <SentMessages messagetype='last-sent-image' payload={message.message}/>

                    if(message.type === 'document' && false)
                    return <SentMessages messagetype='normal-document' payload={message.message}/>

                    if(message.type === 'message' && true)
                    return <SentMessages messagetype='last-sent-document' payload={message.message}/>

                  }
                })
              }

            </fieldset>

        </section>


{/* Footer */}

        <footer className='single-chat-footer'>

        <div className={"single-attachment " + (!showAttachment?'hide':'' )}>
                  <div className="single-image-attachment">
                    <div className='single-attachment-icon'><img src={imageAttachment} alt="img-attachment"></img></div>
                    <div className='single-attachment-text'>Photo or Video</div>
                  </div>
                  <div className="single-image-attachment">
                    <div className='single-attachment-icon'><img src={documentAttachment} alt="img-attachment"></img></div>
                    <div className='single-attachment-text'>Documents</div>
                  </div>
            </div>


          
          <div className='single-attach-icon' onClick={()=>{setAttachmentToggle(!showAttachment)}}><img src={attachment} alt="attach"></img></div>

          <div className='single-footer-message'>
              <input type='text' value={newMessage} placeholder='write a message for peter...' onChange={(e) =>{setNewMessage(e.target.value)}}></input>
          </div>

          <div className='single-footer-right-icons'>

            <div className='single-footer-right-icon'><img src={emoji} alt="emoji"></img></div>
            <div className='single-footer-right-icon' onClick={sendMessage}><img src={send} alt="send"></img></div>

          </div>

          <div className='single-right-footer'></div>
        </footer>
    </div>
  )
}

export default SingleChatScreen