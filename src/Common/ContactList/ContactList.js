import React,{useEffect} from 'react'
import ChartCard from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import "./ContactList.css"
function ContactList({changescreen}) {

 


  return (
    <div className="chat-list">
        <div className="chat-list-header">
          <img src={UserPic} alt=''/>
          <h1>{localStorage.getItem('username')} </h1>
        </div>
        <div className='recent-chat-container'>
        <h2 className="recent-heading">Recent Chat</h2>
        <div className="recent-chat">
          <ChartCard changescreen = {changescreen} chatType='single'/>
          <ChartCard changescreen = {changescreen} chatType='single'/>
          <ChartCard changescreen = {changescreen} chatType='single'/>
          <ChartCard changescreen = {changescreen} chatType='single'/>
          <ChartCard changescreen = {changescreen} chatType='single'/>
        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
          <ChartCard changescreen = {changescreen} chatType='group'/>
          <ChartCard changescreen = {changescreen} chatType='group'/>
          <ChartCard changescreen = {changescreen} chatType='group'/>
          <ChartCard changescreen = {changescreen} chatType='group'/>
          <ChartCard changescreen = {changescreen} chatType='group'/>
        </div>
        </div>
      </div>
  )
}

export default ContactList