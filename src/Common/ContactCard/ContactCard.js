import React,{useState} from "react";
import Sample from "../../Assets/SampleUserImg1.png";
import "./ContactCard.css";

export default function ContactCard({changescreen,chatType}) {
    let mockProps = {
      profileImg: Sample,
      name: "Bruce Wayne",
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
            changescreen(false,false);
          }
          else{
            changescreen(false,true);
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