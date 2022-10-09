import React from 'react'
import { toast } from "react-toastify";
import Sample from "Assets/SampleUserImg1.png";
import axios from 'axios';
import {useDispatch } from "react-redux";
import {setReceiverDetails,loadCurrentChat} from "Redux/Actions/SingleChatActions"
import { useNavigate } from "react-router-dom";


toast.configure();


function SearchedContactCard({chatDetails}) {

  let navigate = useNavigate();
  const dispatch=useDispatch();

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
        .post(`${process.env.REACT_APP_SERVER}/chat/addchat`,payload)
        .then(res =>{
            if(res.data.statusCode === 200){
                toast.success(`User ${chatDetails.username} Added in Your Contact List`, { autoClose: 1000 });
                dispatch(setReceiverDetails(chatDetails));
                dispatch(loadCurrentChat(res.data.chatid,0,25));

                navigate('/chat');

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