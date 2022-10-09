import React from 'react'
import { toast } from "react-toastify";
import Sample from "Assets/SampleUserImg1.png";


toast.configure();


function GroupSearchContactBar({chatDetails,selectedContacts,setSelectedContacts}) {


    let mockProps = {
        profileImg: Sample,
        name: chatDetails?chatDetails.username:'',
        lastChatMessage: chatDetails?chatDetails.contact:"See ya!!",
        lastChatTime: chatDetails?chatDetails.timestamp:"12:12",
        unseenMsgs:chatDetails?chatDetails.messages:'2'
      };
   
    let clickHandler=()=>{
        let found=selectedContacts.find((item)=>{return (item.userid===chatDetails.userid)})
        if(found){
          setSelectedContacts((prev)=> prev.filter((item)=>{return (item.userid!==chatDetails.userid)}) )
        }
        else{
        setSelectedContacts((prev)=>[...prev,{userid:chatDetails.userid,username:chatDetails.username,profileImg:chatDetails.profileImg}])
    }

        
    }
    
      return (
        <div className="chatcard-container" >
          <img
            alt="profile-img"
            className="profile-img"
            src={mockProps.profileImg}
          />
    
          <div className="chat-profile-details">
            <h3>{mockProps.name}</h3>
            <span>{mockProps.lastChatMessage}</span>
          </div>
    
          <div className="time">
            <input type='checkbox' defaultChecked={selectedContacts.find((item)=>{ return (item.userid===chatDetails.userid)})?true:false}
             onClick={clickHandler}/>
          </div>
        </div>
      );
}

export default GroupSearchContactBar;