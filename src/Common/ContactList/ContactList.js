import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {ContactCard} from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import { useSelector,useDispatch } from "react-redux";
import "./ContactList.css"
import {loadCurrentContacts,changeflag} from "Redux/Actions/SingleChatActions"

function ContactList({socket}) {

  let [activeUserId, setActiveUserid] = useState('');

  const state = useSelector((state) => state.SingleChatReducer);  
  var {currentContacts} = state;
  const dispatch=useDispatch();


  useEffect(() =>{
   
    dispatch(loadCurrentContacts())

  },[])

 

  return (
    <div className="chat-list">
        <div className="chat-list-header">
          <img src={UserPic} alt=''/>
          <h1>{localStorage.getItem('username')} </h1>
        </div>
        <div className='recent-chat-container'>
        <h2 className="recent-heading">Recent Chat</h2>
        <div className="recent-chat">


        {currentContacts.map(contact =>{
           return  <ContactCard   
           chatType='single' chatDetails = {contact} 
           activeUserId={activeUserId} setActiveUserid={setActiveUserid}/>
        })}


        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
          <ContactCard  chatType='group'/>
          <ContactCard  chatType='group'/>
          <ContactCard  chatType='group'/>
          <ContactCard  chatType='group'/>
          <ContactCard  chatType='group'/>
        </div>
        </div>
      </div>
  )
}

export default ContactList