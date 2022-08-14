import React,{useState} from "react";
import Sample from "../../Assets/SampleUserImg1.png";
import "./ContactCard.css";




export  function ContactCard({changescreen,chatType,chatDetails,activeUserId,setActiveUserid}) {

 
    let mockProps = {
      profileImg: Sample,
      name: chatDetails?chatDetails.username:'',
      lastChatMessage: "See ya!!",
      lastChatTime: "12:12",
      unseenMsgs:'2'
    };
  

    let isActive = (activeUserId === ((chatDetails !== undefined)?chatDetails.userid:''));

    return (
      <div
        onClick={() => {
          setActiveUserid(chatDetails.userid);
          if(chatType === 'single')
          {
            changescreen(false,chatType,chatDetails,true);
          }
          else{
            changescreen(false,chatType,chatDetails,true);
          }
          
        }}
        className={"chatcard-container " +  (isActive && 'border-bottom-none')}
      >
        {isActive && <div className="overlay"></div>}
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
          <span>{mockProps.lastChatTime}</span>
          <span className="unseen">{mockProps.unseenMsgs}</span>
        </div>
      </div>
    );
  }


