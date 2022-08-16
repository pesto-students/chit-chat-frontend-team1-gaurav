import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {ContactCard} from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import { useSelector,useDispatch } from "react-redux";
import "./ContactList.css"
import {loadCurrentContacts,changeflag} from "Redux/Actions/SingleChatActions"
import {loadCurrentGroups} from "Redux/Actions/GroupChatActions"

function ContactList({socket}) {

  let [activeUserId, setActiveUserid] = useState('');

  const state = useSelector((state) => state.SingleChatReducer);  
  const Groupstate = useSelector((state) => state.GroupChatReducer); 
  var {currentContacts} = state;
  var {currentGroups}=Groupstate;
 
  
  const dispatch=useDispatch();


  useEffect(() =>{
   
    dispatch(loadCurrentContacts())
    dispatch(loadCurrentGroups());

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


        {currentContacts.length!==0 && currentContacts.map(contact =>{
           return  <ContactCard   
           chatType='single' chatDetails = {contact} 
           activeUserId={activeUserId} setActiveUserid={setActiveUserid}/>
        })}


        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
     
     
        {currentGroups.length!==0 && currentGroups.map(contact =>{
           return  <ContactCard  socket={socket}
           chatType='group' activeUserId={activeUserId} setActiveUserid={setActiveUserid}  chatDetails = {contact} 
           />
        })}

        </div>
        </div>
      </div>
  )
}

export default ContactList