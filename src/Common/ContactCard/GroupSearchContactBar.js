import React from 'react'
import { toast } from "react-toastify";
import Sample from "Assets/SampleUserImg1.png";
import axios from 'axios';
import {useDispatch } from "react-redux";
import {setReceiverDetails,loadCurrentChat} from "Redux/Actions/SingleChatActions"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';




toast.configure();


function GroupSearchContactBar({chatDetails,selectedContacts,setSelectedContacts}) {

  let navigate = useNavigate();
  const dispatch=useDispatch();
     console.log('chatDetails',chatDetails);
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
        setSelectedContacts((prev)=>[...prev,{userid:chatDetails.userid,username:chatDetails.username}])
           
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