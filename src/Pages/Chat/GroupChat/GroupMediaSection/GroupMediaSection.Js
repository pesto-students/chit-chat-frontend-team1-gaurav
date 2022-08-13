import React,{useState} from 'react';
import uparrow from '../../../../Assets/up-arrow.png';
import downarrow from '../../../../Assets/down-arrow.png';
import gmi1  from "../../../../Assets/group-message-image-1.png";
import gmi2  from "../../../../Assets/group-message-image-2.png";
import smi1 from "../../../../Assets/single-media-i-1.png";
import spm1 from "../../../../Assets/single-pdf-media.png";
import starReveived from "../../../../Assets/star-received.svg";
import starSent from "../../../../Assets/star-sent.svg";


import './GroupMediaSection.css';


function GroupMediaSection() {

  const [activeflags, setActiveFlags] = useState({
    members: true,
    media: false,
    files: false,
    star: false
  });

  return (
    <> <div className='group-media-container'>
        <div className='group-online-section'>
            <button className='group-online-collipsible-button' onClick={()=>{setActiveFlags({members: !activeflags.members,media: false,files: false,star: false})}}>
              <div>Members <span>14</span></div> 
              <div className='group-collipsible-icon'>
                <img src={!activeflags.members?uparrow:downarrow} alt=''></img>
              </div>
            </button>

            <div className={'online-collipsible-content ' + (!activeflags.members?'':'show')}>
              
            <div className='online-members'>Online-3</div>
              <div className='online-list'>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
            </div>

            <div className='online-members offline'>Offline-6</div>
              <div className='online-list'>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>

                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>


                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>


                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
            </div>

            </div>


        </div>



        <div className='group-media-section'>
              <button className='group-online-collipsible-button' onClick={()=>{setActiveFlags({members: false,media: !activeflags.media,files: false,star: false})}}>
              <div>Media <span>14</span></div> 
              <div className='group-collipsible-icon'>
                <img src={!activeflags.media?uparrow:downarrow} alt=''></img>
              </div>
            </button>

               <div className={'media-collipsible-content ' + (!activeflags.media?'':'show')}>
                    <div className='single-media-file'>
                        <div className='single-media-file-container'><img src={smi1} alt=''></img></div>
                    </div>
                    <div className='single-media-file'>
                        <div className='single-media-file-container'><img src={smi1} alt=''></img></div>
                    </div>

                    <div className='single-media-file'>
                        <div className='single-media-file-container single-media-info'>18+</div>
                    </div>
                    
                </div>

        </div>
        <div className='group-files-section'>

        <button className='group-online-collipsible-button' onClick={()=>{setActiveFlags({members: false,media: false,files: !activeflags.files,star: false})}}>
              <div>Files <span>14</span></div> 
              <div className='group-collipsible-icon'>
                <img src={!activeflags.files?uparrow:downarrow} alt=''></img>
              </div>
            </button>

            <div className={'files-collipsible-content ' + (!activeflags.files?'':'show')}>
                   
            <div className='single-files-container mt'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div>

                <div className='single-files-container'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div>


                <div className='single-files-container'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div>


                <div className='single-files-container'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div>

                    
                </div>

        </div>
        <div className='group-star-messages-section'>
        <button className='group-online-collipsible-button' onClick={()=>{setActiveFlags({members: false,media: false,files: false,star: !activeflags.star})}}>
              <div>Star Messages</div> 
              <div className='group-collipsible-icon'>
                <img src={!activeflags.star?uparrow:downarrow} alt=''></img>
              </div>
            </button>

            <div className={'files-collipsible-content ' + (!activeflags.star?'':'show')}>  
            
            <div className='single-message width-90'>
                  <div className='single-message-content last-reveived-message star-flex'>Can i get result today or tommorow?<div className='single-star-received-icon'><img src={starReveived} alt=''></img></div> </div>
                  </div>
                  <div className='single-time-stamp single-media-star'>22Jan 2021 <span>22:21</span></div>


                  <div className='single-message width-90'>
                  <div className='single-message-content last-reveived-message star-flex'>Can i get result today or tommorow?<div><img className='single-star-received-icon' src={starReveived} alt=''></img></div> </div>
                  </div>
                  <div className='single-time-stamp single-media-star'>22Jan 2021 <span>22:21</span></div>


                  <div className='single-message self-sent-star width-90'>
                  <div className='single-message-content self last-sent-message star-flex'><div className='single-star-sent-icon'><img src={starSent} alt=''></img></div>some random stuff</div>
                  </div>
                  <div className='single-time-stamp self-sent-timestamp end'>22Jan 2021 <span>22:21</span></div>

                  <div className='single-message self-sent-star width-90'>
                  <div className='single-message-content self last-sent-message star-flex'><div className='single-star-sent-icon'><img src={starSent} alt=''></img></div>some random stuff</div>
                  </div>
                  <div className='single-time-stamp self-sent-timestamp end'>22Jan 2021 <span>22:21</span></div>
            
            </div>

        </div>
    </div> 
    </>
  )
}

export default GroupMediaSection;