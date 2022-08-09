import React,{useEffect,useRef} from 'react';
import SideBar from '../../Common/SideBar/SideBar';
import ContactList from "../../Common/ContactList/ContactList"
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection";
import GroupMediaSection from "../Chat/GroupChat/GroupMediaSection/GroupMediaSection";
import {io} from 'socket.io-client'
import './Chat.css';

function Chat() {
  var socket = useRef();
  useEffect(() => {

    socket.current = io('http://localhost:5000');
    socket.current.emit('add-user',1);

  }, [])
  
  
  return (
   
    <div className='main-container'>
        <section className='sidebar'>
          <SideBar/>
        </section>
        <section className='contact-list'>
          <ContactList/>
        </section>
        <section className='main-chat-screen'>
            {/* <SingleChatScreen socket={socket}/> */}
            <GroupChatScreen/>
        </section>
        <section className='media-section'>
          {/* <SingleMediaSection/> */}
          <GroupMediaSection/>
        </section>
    </div>

  )
}

export default Chat