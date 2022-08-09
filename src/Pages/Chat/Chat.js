import React from 'react';
import SideBar from '../../Common/SideBar/SideBar';
import ContactList from "../../Common/ContactList/ContactList"
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import GroupChatScreen from "../Chat/GroupChat/GroupChatScreen/GroupChatScreen";
import SingleMediaSection from "../Chat/SingleChat/SingleMediaSection/SingleMediaSection"
import './Chat.css';

function Chat() {
  return (
   
    <div className='main-container'>
        <section className='sidebar'>
          <SideBar/>
        </section>
        <section className='contact-list'>
          <ContactList/>
        </section>
        <section className='main-chat-screen'>
            <SingleChatScreen/>
            {/* <GroupChatScreen/> */}
        </section>
        <section className='media-section'>
          <SingleMediaSection/>
        </section>
    </div>

  )
}

export default Chat