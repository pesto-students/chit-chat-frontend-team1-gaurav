import React from 'react';
import SingleChatScreen from "../Chat/SingleChat/SingleChatScreen/SingleChatScreen";
import './Chat.css';

function Chat() {
  return (
   
    <div className='main-container'>
        <section className='sidebar'></section>
        <section className='contact-list'></section>
        <section className='main-chat-screen'>
            <SingleChatScreen/>
        </section>
        <section className='media-section'></section>
    </div>

  )
}

export default Chat