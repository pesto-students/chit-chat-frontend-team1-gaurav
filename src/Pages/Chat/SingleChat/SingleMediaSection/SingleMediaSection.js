import React from 'react'
import smi1 from "../../../../Assets/single-media-i-1.png";
import spm1 from "../../../../Assets/single-pdf-media.png";
import starReveived from "../../../../Assets/star-received.svg";
import starSent from "../../../../Assets/star-sent.svg";
import './SingleMediaSection.css';

function SingleMediaSection() {
  return (
    <>
       <div className='single-media-container'>
            <div className='single-media-section'>
                <div className='single-media-header'>
                    <div className='single-media-heading'>
                        <h2>Media</h2> <span>20</span>
                    </div>
                    <div className='single-media-see'>See All</div>
                </div>
                <div className='single-media-content'>
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
            <div className='single-files-section'>
                <div className='single-media-header fixed'>
                        <div className='single-media-heading'>
                            <h2>Files</h2> <span>20</span>
                        </div>
                        <div className='single-media-see'>See All</div>
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

                {/* <div className='single-files-container'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div> */}

            </div>
            <div className='single-star-section'>
            <div className='single-media-header'>
                        <div className='single-media-heading'>
                            <h2>Stared Messages</h2>
                        </div>
                        <div className='single-media-see'>See All</div>
                </div>
            
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
    </>
  )
}

export default SingleMediaSection