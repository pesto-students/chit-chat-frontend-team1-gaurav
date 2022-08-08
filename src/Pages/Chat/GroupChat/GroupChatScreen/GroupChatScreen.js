import React,{useState} from 'react';
import groupHeaderImg from "../../../../Assets/group-header-img.png";
import search  from "../../../../Assets/search.png";
import audioCall  from "../../../../Assets/audio-call.png";
import videoCall  from "../../../../Assets/videocallchat.png";
import inviteMember  from "../../../../Assets/invite-member.png";
import attachment  from "../../../../Assets/attachment.png";
import send  from "../../../../Assets/send.png";
import roundsend  from "../../../../Assets/round-send.png";
import emoji  from "../../../../Assets/emoji.png";
import imageAttachment  from "../../../../Assets/image-attachment.png";
import documentAttachment  from "../../../../Assets/document-attachment.png";
import displayImage  from "../../../../Assets/display-image.png";
import gmi1  from "../../../../Assets/group-message-image-1.png";
import gmi2  from "../../../../Assets/group-message-image-2.png";
import downloadDocument  from "../../../../Assets/download-document.png";
import threeDot  from "../../../../Assets/three-dot.png";
import darkDocument  from "../../../../Assets/dark-download.png";
import darkThreeDot  from "../../../../Assets/dark-three-dot.png";
import singletick  from "../../../../Assets/single-tick.png";
import doubletick  from "../../../../Assets/double-tick.png";
import doubletickread  from "../../../../Assets/double-tick-read.png";
// import   from "../../../../Assets/search.png";
import "./GroupChatScreen.css";

function GroupChatScreen() {

  const [showAttachment,setAttachmentToggle] = useState(false);

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
              <legend> Yesterday </legend>

              <div className='group-message'>
                  <div className='group-message-image'></div>
                  <div className='group-message-content'>
                        {/* <div className='group-message-name'>Krishna</div> */}
                        <div className='group-message-message'>hiking tomorrow?</div>
                  </div>
                  {/* <div className='group-time-stamp'>22:21</div> */}
              </div>

        
              
              
               <div className='group-message'>
                  <div className='group-message-image'><div><img src={gmi1} alt=''></img></div></div>
                  <div className='group-message-content last-reveived-message'>
                        <div className='group-message-name'>Krishna</div>
                        <div className='group-message-message'>hiking tomorrow?</div>
                  </div>
                  <div className='group-time-stamp'>22:21</div>
              </div>


              <div className='group-message'>
                  <div className='group-message-image'><img src={gmi2} alt=''></img></div>
                  <div className='group-message-content last-reveived-message'>
                        <div className='group-message-name'>shoeb</div>
                        <div className='group-message-message'>Hell Yeah! why not</div>
                  </div>
                  <div className='group-time-stamp'>22:21</div>
              </div>


               <div className='group-message'>
                   <div className='group-message-image'><img src={gmi2} alt=''></img></div>
                        <div className='group-image-content last-reveived-message'>
                            <div className='group-message-name'>shoeb</div>
                            <div className='group-image-display'><img src={displayImage} alt=''></img></div>
                            <div className='group-image-desc'>Done Mate</div>    
                        </div>
                   <div className='group-time-stamp'>22:21</div>
                </div> 
              

                <div className='group-message'>
                   <div className='group-message-image'><img src={gmi2} alt=''></img></div>
                        <div className='group-image-content last-reveived-message'>
                           <div className='group-document-header'>
                             <div className='group-message-name'>shoeb</div>
                             <div className='three-dot-icon'><img src={threeDot} alt=''></img></div>
                           </div>
                           <div className='group-document-content'>
                             <div className='download-document-icon'><img src={downloadDocument} alt=''></img></div>
                             <div className='group-document-details'>
                                <div className='group-document-name'>tourist Location.pdf</div>
                                <div className='group-document-detail'>12MB <span>pdf</span></div>
                             </div>
                           </div>  
                        </div>
                   <div className='group-time-stamp'>22:21</div>
                </div> 

            </fieldset>


            <fieldset className='day-container'>
             <legend>Today</legend>

             <div className='group-message self-sent'>
                  <div className='group-message-image'></div>
                  <div className='group-message-content self'>
                        {/* <div className='group-message-name'>Krishna</div> */}
                        <div className='group-message-message self group-flex'>hiking tomorrow? <div className='group-tick-icon'><img src={singletick} alt=''></img></div></div>
                  </div>
                  {/* <div className='group-time-stamp'>22:21</div> */}
              </div>
              
              
               <div className='group-message self-sent'>
                  <div className='group-time-stamp'>22:21</div>
                  {/* <div className='group-message-image'><div><img src={gmi1} alt=''></img></div></div> */}
                  <div className='group-message-content self last-sent-message'>
                        {/* <div className='group-message-name'>Krishna</div> */}
                        <div className='group-message-message self group-flex'>hiking tomorrow? <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                  </div>
              </div>



               <div className='group-message self-sent'>
                   <div className='group-time-stamp'>22:21</div>
                   {/* <div className='group-message-image'><img src={gmi2} alt=''></img></div> */}
                        <div className='group-image-content self last-sent-message'>
                            {/* <div className='group-message-name'>shoeb</div> */}
                            <div className='group-image-display'><img src={displayImage} alt=''></img></div>
                            <div className='group-image-desc self group-flex'>Done Mate <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>    
                        </div>
                </div> 


                <div className='group-message self-sent'>
                   {/* <div className='group-message-image'><img src={gmi2} alt=''></img></div> */}
                   <div className='group-time-stamp'>22:21</div>
                        <div className='group-image-content self last-sent-message'>
                           <div className='group-document-header align-end'>
                             {/* <div className='group-message-name'>shoeb</div> */}
                             <div className='three-dot-icon'><img src={darkThreeDot} alt=''></img></div>
                           </div>
                           <div className='group-document-content '>
                             <div className='download-document-icon'><img src={darkDocument} alt=''></img></div>
                             <div className='group-document-details'>
                                <div className='group-document-name self'>tourist Location.pdf</div>
                                <div className='group-document-detail single-tick-document-sent group-flex'><div>12MB <span>pdf</span></div> <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                             </div>
                           </div>  
                        </div>
                </div> 
              
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