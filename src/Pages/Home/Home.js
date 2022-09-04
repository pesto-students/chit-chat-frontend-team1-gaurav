import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "Assets/group-chat.gif";
import SecurityIcon from "Assets/946-equity-security-gradient.gif";
import Videogif from "Assets/970-video-conference-gradient.gif";
import FileGif from "Assets/56-document-gradient.gif";
import Msggif from "Assets/177-envelope-mail-send-gradient.gif";
import Logo from "Assets/Logo.png";
import "./Home.css";

function Home() {
  let navigate = useNavigate();
  return (
    <>
    <header className="header">
      <navbar className="navbar">
        <div className="home-logo"><img src={Logo} alt='chit-chat'></img></div>
        <div className="nav-links">
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Signup</li>
            <li>Blog</li>
          </ul>
        </div>
      </navbar>

      <div className="header-desc">
        
      </div>
    </header>


    <section className="features">
      <div className="container-home">
      <h1 className="feature-header">Check out All Features</h1>

      <div className="first-row">

        <container className="feature-container">
          <div className="feature-card">
            <img className="feature-logo" src={Msggif} alt=""></img>
            <p className="feature-name">Messaging</p>
            <p className="feature-description">Landing Pages, User Flow, Wireframing, Prototyping, Mobile App Design, Web App</p>
          </div>
        </container>

        <container className="feature-container">
          <div className="feature-card">
            <img className="feature-logo" src={GroupIcon}  alt=""></img>
            <p className="feature-name">Group Chat</p>
            <p className="feature-description">Landing Pages, User Flow, Wireframing, Prototyping, Mobile App Design, Web App</p>
          </div>
        </container>

        <container className="feature-container">
          <div className="feature-card">
            <img className="feature-logo" src={Videogif} alt=""></img>
            <p className="feature-name">Video Call</p>
            <p className="feature-description">Landing Pages, User Flow, Wireframing, Prototyping, Mobile App Design, Web App</p>
          </div>
        </container>

      </div>

      <div className="second-row">

        <container className="feature-container">
          <div className="feature-card">
            <img className="feature-logo" src={FileGif} alt=""></img>
            <p className="feature-name">File Sharing</p>
            <p className="feature-description">Landing Pages, User Flow, Wireframing, Prototyping, Mobile App Design, Web App</p>
          </div>
        </container>

        <container className="feature-container">
          <div className="feature-card">
            <img className="feature-logo" src={SecurityIcon} alt=""></img>
            <p className="feature-name">Privacy & Security</p>
            <p className="feature-description">Landing Pages, User Flow, Wireframing, Prototyping, Mobile App Design, Web App</p>
          </div>
        </container>

      </div>
      </div>
    </section>
    </>
  );
}

export default Home;
