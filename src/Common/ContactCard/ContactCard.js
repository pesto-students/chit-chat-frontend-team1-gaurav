import React,{useState} from "react";
import { useDispatch } from "react-redux";
import Sample from "../../Assets/SampleUserImg1.png";
import {setReceiverDetails,loadCurrentChat,getStaredMessages} from "Redux/Actions/SingleChatActions"
import { setReceiverGroupDetails, loadCurrentGroupChat } from "../../Redux/Actions/GroupChatActions";
import { setView } from "../../Redux/Actions/UserActions";
import "./ContactCard.css";




export  function ContactCard({chatDetails,chatType,activeUserId,setActiveUserid}) {

  const dispatch=useDispatch();

 
    let mockProps = {
      profileImg: Sample,
      name: chatDetails?chatDetails.username:'',
      lastChatMessage: "See ya!!",
      lastChatTime: "12:12",
      unseenMsgs:'2'
    };
    if(chatType === 'single'){
       var {username,userid,chatid}=chatDetails
    }
    else{
       var {_id,name:username,membersArray}=chatDetails
    }

    // var isActive =(activeUserId === ((chatDetails !== undefined)?chatDetails.userid:''));
    var isActive;

    if(chatType === 'single'){
      if(activeUserId === ((chatDetails !== undefined)?chatDetails.userid:'')){
        isActive = true;
      }
    }
    else{
      if(activeUserId === ((chatDetails !== undefined)?chatDetails._id:'')){
        isActive = true;
      }
    }
    
    const onClickHandler=()=>{
        if(chatType === 'single'){
          dispatch(setView('single'));
          dispatch(setReceiverDetails(chatDetails))
          dispatch(loadCurrentChat(chatDetails.chatid));
          dispatch(getStaredMessages(chatDetails.chatid));
          setActiveUserid(chatDetails.userid);
        }
        else {
          dispatch(setView('group'));
          dispatch(setReceiverGroupDetails(chatDetails));
          dispatch(loadCurrentGroupChat(chatDetails._id));
       
          setActiveUserid(chatDetails._id);
        }
    }

    return (
      <div
        onClick={onClickHandler}
        className={"chatcard-container " +  (isActive && 'border-bottom-none')}
      >
        {isActive && <div className="overlay"></div>}
        <img
          alt="profile-img"
          className="profile-img"
          src={mockProps.profileImg}
        />
  
        <div className="chat-profile-details">
          <h3>{username}</h3>
          <span>{mockProps.lastChatMessage}</span>
        </div>
  
        <div className="time">
          <span>{mockProps.lastChatTime}</span>
          <span className="unseen">{mockProps.unseenMsgs}</span>
        </div>
      </div>
    );
  }


