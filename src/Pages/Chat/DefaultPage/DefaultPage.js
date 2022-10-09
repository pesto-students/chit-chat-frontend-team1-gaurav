import React from 'react';
import logo from 'Assets/Logo.png'
import security from 'Assets/security-default.png'
import './DefaultPage.css';

function DefaultPage() {
  return (
    <div className='default-container'>
        <div className='default-logo'>
            <img src={logo} alt='chit-chat'></img>
        </div>
        <p className='messaging'>Messaging Like Never Before !!</p>
        <p className='p-2'>Send And Receive Messages , share Media with better Security...</p>
        <p className='messaging'>Enhance your messaging expirience with us...</p>

        <div className='end-to-end'>
            <div className='security-logo'><img src={security} alt=''></img></div>
            <p>End-to-End Encryption</p>
        </div>

    </div>
  )
}

export default DefaultPage