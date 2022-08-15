import React,{useState} from 'react';
import ReceivedMessages from './CommonComponents/ReceivedMessages';
import SentMessages from './CommonComponents/SentMessages'
import groupHeaderImg from "Assets/group-header-img.png";
import search  from "Assets/search.png";
import audioCall  from "Assets/audio-call.png";
import videoCall  from "Assets/videocallchat.png";
import inviteMember  from "Assets/invite-member.png";
import attachment  from "Assets/attachment.png";
import send  from "Assets/send.png";
import emoji  from "Assets/emoji.png";
import imageAttachment  from "Assets/image-attachment.png";
import documentAttachment  from "Assets/document-attachment.png";
import { useSelector } from 'react-redux';

import "./GroupChatScreen.css";

function GroupChatScreen() {

  const [showAttachment,setAttachmentToggle] = useState(false);
  const groupDetails=useSelector((state)=> state.GroupChatReducer)

  console.log('group Details', groupDetails);

  return (
    <div className='group-main-container'>

      {/* Header */}


        <header className='group-chat-header'>
            <div className='group-header-leftbar'>
                <div className='group-header-logo'>
                    <img src={groupHeaderImg} alt='chat-logo'></img>
                </div>
                <div className='group-header-info'>
                  <h1 className='group-person-name'>Peter Parker</h1>
                  {/* <div className='group-status'>
                      <span class="group-status-dot"></span>
                      <div className='group-status-name'>Online</div>
                  </div> */}
                </div>
            </div>

            <div className='group-header-icons'>
              <div className='right-icons'><img src={inviteMember} alt="invite-member"></img></div>
              <div className='right-icons video-call-group'><img src={videoCall} alt="video-call"></img></div>
              <div className='right-icons'><img src={audioCall} alt="audio-call"></img></div>
              <div className='right-icons '><img src={search} alt="search"></img></div>
              
            </div>
        </header>

{/* Main - section  */}


        <section className='group-main-section'> 

            <fieldset className='day-container'>
             
          {console.log(process.env.MESSAGE_SECRET_KEY)}
          {[].slice(0)
            .reverse()
            .map((message) => {
              if (message.senderid === {}.userid) {
                return (
                  <ReceivedMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={{}.chatid}
                  />
                );
              } else {
                return (
                  <SentMessages
                    messagetype={message.type}
                    payload={message}
                    chatid={{}.chatid}
                  />
                );
              }
            })}
              
            </fieldset>

           

        </section>


{/* Footer */}

        <footer className='group-chat-footer'>

        <div className={"group-attachment " + (!showAttachment?'hide':'' )}>
                  <div className="group-image-attachment">
                    <div className='group-attachment-icon'><img src={imageAttachment} alt="img-attachment"></img></div>
                    <div className='group-attachment-text'>Photo or Video</div>
                  </div>
                  <div className="group-image-attachment">
                    <div className='group-attachment-icon'><img src={documentAttachment} alt="img-attachment"></img></div>
                    <div className='group-attachment-text'>Documents</div>
                  </div>
            </div>


          
          <div className='group-attach-icon' onClick={()=>{setAttachmentToggle(!showAttachment)}}><img src={attachment} alt="attach"></img></div>

          <div className='group-footer-message'>
              <input type='text' placeholder='write a message for peter...'></input>
          </div>

          <div className='group-footer-right-icons'>

            <div className='group-footer-right-icon'><img src={emoji} alt="emoji"></img></div>
            <div className='group-footer-right-icon'><img src={send} alt="send"></img></div>
            {/* <div className='group-footer-right-icon'><img src={roundsend} alt="send"></img></div> */}

          </div>

          <div className='group-right-footer'></div>
        </footer>
    </div>
  )
}

export default GroupChatScreen