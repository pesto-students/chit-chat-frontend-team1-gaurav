import React from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import downloadDocument from "Assets/download-document.png";
import threeDot from "Assets/three-dot.png";
import displayImage from "Assets/display-image.png";
import starWhite from "Assets/star-white.svg";
import starBlack from "Assets/star-black.svg";
import { useDispatch,useSelector } from "react-redux";
import gmi1  from "Assets/group-message-image-1.png";
import gmi2  from "Assets/group-message-image-2.png";
import {getStaredMessages} from "Redux/Actions/SingleChatActions"



function ReceivedMessages({ messagetype, payload ,shouldBeRound}) {

  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const { receiverGroupDetails } = groupDetails;

  const getUserName = (userid) => {
    
    var username;
        receiverGroupDetails.groupmembersarray.map((member) => {
        if(member.userid === userid)
        username =  member.username;
    })

    return username;
  }

  const getDesiredTimeStamp = (timestamp) => {
    return new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes()
  }

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,'dhruvin').toString(CryptoJS.enc.Utf8)
  }



  if (messagetype === "message" && shouldBeRound) {


    return (
        <div className='group-message'>
        <div className='group-message-image'></div>
        <div className='group-message-content'>
              {/* <div className='group-message-name'>Krishna</div> */}
              <div className='group-message-message'>{getDecryptedMessage(payload.message)}</div>
        </div>
        {/* <div className='group-time-stamp'>22:21</div> */}
    </div>
    );


  } else if (messagetype === "message" && !shouldBeRound) {


    return (
      <div className='group-message'>
      <div className='group-message-image'></div>
      <div className='group-message-content last-reveived-message'>
            <div className='group-message-name'>{getUserName(payload.senderid)}</div>
            <div className='group-message-message'>{getDecryptedMessage(payload.message)}</div>
      </div>
      <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
  </div>
    );


  } else if (messagetype === "image" && shouldBeRound) {

      
    return (
      <div className='group-message'>
      <div className='group-message-image'></div>
           <div className='group-image-content'>
               {/* <div className='group-message-name'>{getUserName(payload.senderid)}</div> */}
               <div className='group-image-display'><img src={displayImage} alt=''></img></div>
               <div className='group-image-desc'>{getDecryptedMessage(payload.message)}</div>    
           </div>
      <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
   </div>
    );


  } else if (messagetype === "image" && !shouldBeRound) {


    return (
        <div className='group-message'>
        <div className='group-message-image'><img src={gmi2} alt=''></img></div>
             <div className='group-image-content last-reveived-message'>
                 <div className='group-message-name'>{getUserName(payload.senderid)}</div>
                 <div className='group-image-display'><img src={displayImage} alt=''></img></div>
                 <div className='group-image-desc'>{getDecryptedMessage(payload.message)}</div>    
             </div>
        <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
     </div> 
   
    );


  } else if (messagetype === "document") {


    return (
        <div className='group-message'>
        <div className='group-message-image'><img src={gmi2} alt=''></img></div>
             <div className='group-image-content last-reveived-message'>
                <div className='group-document-header'>
                  <div className='group-message-name'>{getUserName(payload.senderid)}</div>
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
        <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
     </div> 
    );
  }
}

export default ReceivedMessages;
