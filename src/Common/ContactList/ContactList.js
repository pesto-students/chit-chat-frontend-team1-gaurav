import React,{useEffect, useState} from 'react';
import {ContactCard} from "../ContactCard/ContactCard"
import UserPic from "Assets/ProfilePic.png";
import { useSelector,useDispatch } from "react-redux";
import {loadCurrentContacts} from "Redux/Actions/SingleChatActions"
import {loadCurrentGroups} from "Redux/Actions/GroupChatActions"
import "./ContactList.css"

function ContactList({socket}) {


  let [activeUserId, setActiveUserid] = useState('');

  const state = useSelector((state) => state.SingleChatReducer);  
  const Groupstate = useSelector((state) => state.GroupChatReducer); 
  var {currentContacts} = state;
  var {currentGroups}=Groupstate;
 
  const [profileimg, setProfileimg] = useState("");
  

  const dispatch=useDispatch();


  useEffect(() =>{
   
    dispatch(loadCurrentContacts())
    dispatch(loadCurrentGroups());
    getImageFromKey();

  },[])


   const getImageFromKey = () => {
    if (localStorage.getItem('profilepic') === "") {
      setProfileimg(UserPic);
    } else {
        setProfileimg(`${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(localStorage.getItem('profilepic'))}`);
    }
  };

  return (
    <div className="chat-list">
        <div className="chat-list-header">
          <img src={profileimg} alt=''/>
          <h1>{localStorage.getItem('username')} </h1>
        </div>
        <div className='recent-chat-container'>
        <h2 className="recent-heading">Recent Chat</h2>
        <div className="recent-chat">


        {currentContacts.length!==0 && currentContacts.map((contact,index) =>{
           return  <ContactCard   
           key={index}
           chatType='single' chatDetails = {contact} 
           activeUserId={activeUserId} setActiveUserid={setActiveUserid}/>
        })}


        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
     
     
        {currentGroups.length!==0 && currentGroups.map((contact,index) =>{
           return  <ContactCard  
           key={index}
           socket={socket}
           chatType='group' activeUserId={activeUserId} setActiveUserid={setActiveUserid}  chatDetails = {contact} 
           />
        })}

        </div>
        </div>
      </div>
  )
}

export default ContactList