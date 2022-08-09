import React,{useState} from 'react';
import singleHeaderImg from "../../../../Assets/single-header-img.png";
import search  from "../../../../Assets/search.png";
import audioCall  from "../../../../Assets/audio-call.png";
import videoCall  from "../../../../Assets/videocallchat.png";
import attachment  from "../../../../Assets/attachment.png";
import send  from "../../../../Assets/send.png";
import emoji  from "../../../../Assets/emoji.png";
import imageAttachment  from "../../../../Assets/image-attachment.png";
import documentAttachment  from "../../../../Assets/document-attachment.png";
import displayImage  from "../../../../Assets/display-image.png";
import downloadDocument  from "../../../../Assets/download-document.png";
import threeDot  from "../../../../Assets/three-dot.png";
import darkDocument  from "../../../../Assets/dark-download.png";
import darkThreeDot  from "../../../../Assets/dark-three-dot.png";
import singletick  from "../../../../Assets/single-tick.png";
import doubletick  from "../../../../Assets/double-tick.png";
import doubletickread  from "../../../../Assets/double-tick-read.png";
// import   from "../../../../Assets/search.png";
import "./SingleChatScreen.css";

function SingleChatScreen({socket}) {

  const [showAttachment,setAttachmentToggle] = useState(false);

  return (
    <div className='single-main-container'>

      {/* Header */}


        <header className='single-chat-header'>
            <div className='single-header-leftbar'>
                <div className='single-header-logo'>
                    <img src={singleHeaderImg} alt='chat-logo'></img>
                </div>
                <div className='single-header-info'>
                  <h1 className='single-person-name'>Peter Parker</h1>
                  <div className='single-status'>
                      <span class="single-status-dot"></span>
                      <div className='single-status-name'>Online</div>
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


              <div className='single-message'>
                  <div className='single-message-content'>Hello,how are u?</div>
                  {/* <div className='single-time-stamp'>22:21</div> */}
              </div>

              <div className='single-message'>
                  <div className='single-message-content'>Did you have a good Weekend?</div>
                  {/* <div className='single-time-stamp'>22:21</div> */}
              </div>


              <div className='single-message'>
                  <div className='single-message-content last-reveived-message'>Can i get result today or tommorow?</div>
                  <div className='single-time-stamp'>22:21 </div>
              </div>
               

              <div className='single-message self-sent'>
                  <div className='single-message-content self single-flex'>Hey,Sure <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                  {/* <div className='single-time-stamp'>22:21</div> */}
              </div>

              <div className='single-message self-sent'>
                  <div className='single-time-stamp'>22:21</div>
                  <div className='single-message-content self last-sent-message single-flex'>some random stuff <div className='group-tick-icon'><img src={singletick} alt=''></img></div></div>
              </div>


              <div className='single-image'>
                  <div className='single-image-content last-reveived-message'>
                    <div className='single-image-display'><img src={displayImage} alt=''></img></div>
                    <div className='single-image-desc'>Done Mate</div>
                  </div>
                  <div className='single-img-timestamp'>22:21</div>
              </div>

              <div className='single-image'>
                  <div className='single-image-content last-reveived-message document-flex'>
                    
                    <div className='download-document-icon'><img src={downloadDocument} alt=''></img></div>
                    <div className='group-document-details'>
                          <div className='single-document-name'>tourist Location.pdf</div>
                          <div className='single-document-detail'>12MB <span>pdf</span></div>
                    </div>
                    <div className='three-dot-icon'><img src={threeDot} alt=''></img></div>

                  </div>
                  <div className='single-img-timestamp'>22:21</div>
              </div>
           

            </fieldset>


            <fieldset className='day-container'>
             <legend>Today</legend>

            

             <div className='single-message self-sent'>
                  <div className='single-time-stamp'>22:21</div>
                  <div className='single-message-content self last-sent-message single-flex'>some random stuff <div className='group-tick-icon'><img src={doubletickread} alt=''></img></div></div>
              </div>

              <div className='single-image self-sent'>
                  <div className='single-img-timestamp'>22:21</div>
                  <div className='single-image-content self last-sent-message'>
                    <div className='single-image-display'><img src={displayImage} alt=''></img></div>
                    <div className='single-image-desc self-image single-flex'>Done Mate <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                  </div>
              </div>

              <div className='single-image self-sent'>
                  <div className='single-img-timestamp'>22:21</div>
                  <div className='single-image-content self last-sent-message document-flex'>
                    
                    <div className='download-document-icon'><img src={darkDocument} alt=''></img></div>
                    <div className='group-document-details'>
                          <div className='single-document-name self'>tourist Location.pdf</div>
                          <div className='single-document-detail single-flex'><div>12MB <span>pdf</span></div> <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                    </div>
                    <div className='three-dot-icon'><img src={darkThreeDot} alt=''></img></div>

                  </div>
              </div>
              
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
              <input type='text' placeholder='write a message for peter...'></input>
          </div>

          <div className='single-footer-right-icons'>

            <div className='single-footer-right-icon'><img src={emoji} alt="emoji"></img></div>
            <div className='single-footer-right-icon'><img src={send} alt="send"></img></div>

          </div>

          <div className='single-right-footer'></div>
        </footer>
    </div>
  )
}

export default SingleChatScreen