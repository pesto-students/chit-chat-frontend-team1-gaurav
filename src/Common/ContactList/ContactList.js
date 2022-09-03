import React,{useEffect, useState} from 'react';
import axios from 'axios';
import AWS from "aws-sdk";
import {ContactCard} from "../ContactCard/ContactCard"
import UserPic from "../../Assets/ProfilePic.png"
import { useSelector,useDispatch } from "react-redux";
import "./ContactList.css"
import {loadCurrentContacts,changeflag} from "Redux/Actions/SingleChatActions"
import {loadCurrentGroups} from "Redux/Actions/GroupChatActions"

function ContactList({socket}) {

  
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });



  let [activeUserId, setActiveUserid] = useState('');

  const user = useSelector((state) => state.UserReducer);  
  const state = useSelector((state) => state.SingleChatReducer);  
  const Groupstate = useSelector((state) => state.GroupChatReducer); 
  var {userName,profilepic} = user;
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
      myBucket.getObject(
        {
          Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
          Key: localStorage.getItem('profilepic'),
        },

        (err, data) => {
          if (err) setProfileimg(UserPic);

          setProfileimg(
            `data:image/png;base64,${data.Body.toString("base64")}`
          );
        }
      );
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