import React from 'react'
import { toast } from "react-toastify";
import Sample from "Assets/SampleUserImg1.png";
import axios from 'axios';


toast.configure();


function SearchedContactCard({chatDetails,changescreen}) {
    let mockProps = {
        profileImg: Sample,
        name: chatDetails?chatDetails.username:'',
        lastChatMessage: chatDetails?chatDetails.contact:"See ya!!",
        lastChatTime: chatDetails?chatDetails.timestamp:"12:12",
        unseenMsgs:chatDetails?chatDetails.messages:'2'
      };
    
    const addcontact = () =>{
        let payload = 
                    {
                      createrid :localStorage.getItem('userid'),
                      otheruser : chatDetails.userid,
                    }
    
        axios
        .post('http://localhost:5000/chat/addchat',payload)
        .then(res =>{
            if(res.data.statusCode === 200){
                toast.success(`User ${chatDetails.username} Added in Your Contact List`, { autoClose: 1000 });
                changescreen(false,'single',{userid:chatDetails.userid,username:chatDetails.username,chatid:res.data.chatid},true);
            }
            else{
                toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });
            }

        })          
        .catch(err =>{
            toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });
        })      
    

    }
    
      return (
        <div className="chatcard-container" onClick={addcontact}>
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

export default SearchedContactCard