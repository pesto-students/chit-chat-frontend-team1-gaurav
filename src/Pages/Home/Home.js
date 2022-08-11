import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import GroupIcon from "../../Assets/Group.png";
import SecurityIcon from "../../Assets/Security.png";
import VideoIcon from "../../Assets/VideoCall.png";
import FileIcon from "../../Assets/FileSharing.png";
import MsgIcon from "../../Assets/MessageIcon.png";
import Logo from "../../Assets/Logo.png";


function Home() {
  let navigate = useNavigate();
  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.navigation}>
        <ul className={styles.logoList}>
          <li>
            <img src={Logo} alt="chitchat logo" />
          </li>
        </ul>

        <ul className={styles.navList}>
          <li onClick={()=>{ navigate('/login')}}>Login</li>
          <li>About Us</li>
          <li>Support</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className={styles.mainContainer}>
        <h1>Talking with everyone and keep secure</h1>
        <button onClick={()=>{ navigate('/signup')}}>Get Started</button>
        <div className={styles.feauturesContainer}>
          <div className={styles.feauture}>
            <img src={MsgIcon} alt="message icon" />
            <h3>Messaging</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </div>

          <div className={styles.feauture}>
            <img src={GroupIcon} alt="message icon" />
            <h3>Group Chat</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </div>

          <div className={styles.feauture}>
            <img src={VideoIcon} alt="message icon" />
            <h3>Video Call</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </div>

          <div className={styles.feauture}>
            <img src={FileIcon} alt="message icon" />
            <h3>File Sharing</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </div>

          <div className={styles.feauture}>
            <img src={SecurityIcon} alt="message icon" />
            <h3>Privacy & Security</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home