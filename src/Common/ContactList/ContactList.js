import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {ContactCard} from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import { useSelector,useDispatch } from "react-redux";
import "./ContactList.css"
import {loadCurrentContacts,changeflag} from "Redux/Actions/SingleChatActions"

function ContactList({socket,changescreen}) {

  let [activeUserId, setActiveUserid] = useState('');
  const[contactlist,setcontactlist] = useState([]);
  const[groupcontactlist,setgroupcontactlist] = useState([]);
 
  const state = useSelector((state) => console.log('state',state));
  const dispatch=useDispatch();


  useEffect(() =>{
   
    dispatch(loadCurrentContacts())
    console.log('state',state)
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

    //fetch all groups enrolled by the user
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

  
  
    const makeActive = (activeflag) =>[
      setActiveUserid(activeflag)
    ]

  useEffect(()=>{
    debugger;
    if(socket.current !== undefined)
    socket.current.on("reload-contacts", (data) => {
    debugger;
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
    });

  },[socket]);


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
           return  <ContactCard changescreen = {changescreen}  
           chatType='single' chatDetails = {contact} 
           activeUserId={activeUserId} setActiveUserid={setActiveUserid}/>
        })}


        </div>
        </div>

        <div className='group-chat-container'>
        <h2 className="recent-heading">Group Chat</h2>
        <div className="recent-group">
          <ContactCard changescreen = {changescreen} chatType='group'/>
          <ContactCard changescreen = {changescreen} chatType='group'/>
          <ContactCard changescreen = {changescreen} chatType='group'/>
          <ContactCard changescreen = {changescreen} chatType='group'/>
          <ContactCard changescreen = {changescreen} chatType='group'/>
        </div>
        </div>
      </div>
  )
}

export default ContactList