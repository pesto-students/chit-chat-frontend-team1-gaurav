import React,{useState} from "react";
import Sample from "../../Assets/SampleUserImg1.png";
import "./ContactCard.css";

export default function ContactCard({changescreen,chatType,chatDetails}) {
    let mockProps = {
      profileImg: Sample,
      name: chatDetails?chatDetails.username:'',
      lastChatMessage: "See ya!!",
      lastChatTime: "12:12",
      unseenMsgs:'2'
    };
  
    let [active, setActive] = useState(false);

    let activeStateProp = {
      active: true
    };
  
    return (
      <div
        onClick={() => {
          setActive(!active);
          if(chatType === 'single')
          {
            changescreen(false,chatType,chatDetails);
          }
          else{
            changescreen(false,chatType,chatDetails);
          }
          
        }}
        className={"chatcard-container " +  (active && 'border-bottom-none')}
      >
        {active && <div className="overlay"></div>}
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