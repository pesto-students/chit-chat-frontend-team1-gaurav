import React,{useEffect, useState} from 'react';
import axios from 'axios';
import ChartCard from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import "./ContactList.css"
function ContactList({changescreen}) {

  const[contactlist,setcontactlist] = useState([]);
  const[groupcontactlist,setgroupcontactlist] = useState([]);
 
  useEffect(() =>{

    axios
    .post("http://localhost:5000/chat/currentcontacts", {
      userid: localStorage.getItem("userid"),
    })
    .then((res) => {
        setcontactlist(res.data);
    })
    .catch((err) => {
      // toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
    });

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


        {contactlist.map(contact =>{
           return  <ChartCard changescreen = {changescreen} chatType='single' chatDetails = {contact}/>
        })}


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