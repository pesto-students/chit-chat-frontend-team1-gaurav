import React from 'react'
import ChartCard from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import "./ContactList.css"
function ContactList() {
  return (
    <div className="chat-list">
        <div className="chat-list-header">
          <img src={UserPic} />
          <h1>Dhruvin </h1>
        </div>
        <div className='recent-chat-container'>
        <h2 className="recent-heading">Recent Chat</h2>
        <div className="recent-chat">
          <ChartCard />
          <ChartCard />
          <ChartCard />
          <ChartCard />
          <ChartCard />
        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
          <ChartCard />
          <ChartCard />
          <ChartCard />
          <ChartCard />
          <ChartCard />
        </div>
        </div>
      </div>
  )
}

export default ContactList