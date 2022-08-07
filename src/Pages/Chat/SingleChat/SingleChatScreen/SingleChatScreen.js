import React from 'react';
import singleHeaderImg from "../../../../Assets/single-header-img.png";
import "./SingleChatScreen.css";

function SingleChatScreen() {
  return (
    <div className='single-main-container'>
        <header className='single-chat-header'>
            <div>
                <div className='single-header-logo'>
                    <img src={singleHeaderImg} alt='chat-logo'></img>
                </div>
                <div className='single-header-info'></div>
            </div>

            <div className='single-header-icons'></div>
        </header>
        <section className='single-main-section'></section>
        <footer className='single-chat-footer'></footer>
    </div>
  )
}

export default SingleChatScreen