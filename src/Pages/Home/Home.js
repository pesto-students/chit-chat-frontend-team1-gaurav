import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "Assets/group-chat.gif";
import SecurityIcon from "Assets/946-equity-security-gradient.gif";
import Videogif from "Assets/970-video-conference-gradient.gif";
import FileGif from "Assets/56-document-gradient.gif";
import Msggif from "Assets/177-envelope-mail-send-gradient.gif";
import Logo from "Assets/Logo.png";
import heroguy from "Assets/hero-guy-1.png";
import herogirl from "Assets/hero-girl.png";
import rightImg from "Assets/transparent.png";
// import 'animate.css';
import displayImg from "Assets/chat-screen.png"
import "./Home.css";

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <header className="header">
        <navbar className="navbar">
          <div className="home-logo">
            <img src={Logo} alt="chit-chat"></img>
          </div>
          <div className="nav-links">
            <ul>
              <li onClick={() => navigate('/')}>Home</li>
              <li onClick={() => navigate('/login')}>Login</li>
              <li onClick={() => navigate('/signup')}>Signup</li>
              <li>Blog</li>
            </ul>
          </div>
        </navbar>
        <div className="header-body">
        <div className="header-desc">
          <h1 className="header-h1 animate__bounceInLeft">Connect Anywhere, Anytime</h1>
          <p className="header-one-liner">
            we create our buildings and then they create us. Likewise, we help
            you construct your circle of friends and your communities and then
            they construct you
          </p>
          <div className="get-started">Interested?Get Started</div>
          <button className="home-login">Login</button>
        </div>
        <div className="header-right-section">
          <img src={rightImg} alt=""></img>
        </div>

        <div className="hero-guy"><img src={heroguy} alt=""></img></div>
        <div className="hero-girl"><img src={herogirl} alt=""></img></div>

        </div>

      </header>
        {/* <section className="display-image-sec">
          <div><img src={displayImg} alt='Chat-Page'></img></div>
        </section> */}

      <section className="features">
        <div className="container-home">
          <h1 className="feature-header">Check out All Features</h1>

          <div className="first-row">
            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={Msggif} alt=""></img>
                <p className="feature-name">Messaging</p>
                <p className="feature-description">
                  Landing Pages, User Flow, Wireframing, Prototyping, Mobile App
                  Design, Web App
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={GroupIcon} alt=""></img>
                <p className="feature-name">Group Chat</p>
                <p className="feature-description">
                  Landing Pages, User Flow, Wireframing, Prototyping, Mobile App
                  Design, Web App
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={Videogif} alt=""></img>
                <p className="feature-name">Video Call</p>
                <p className="feature-description">
                  Landing Pages, User Flow, Wireframing, Prototyping, Mobile App
                  Design, Web App
                </p>
              </div>
            </container>
          </div>

          <div className="second-row">
            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={FileGif} alt=""></img>
                <p className="feature-name">File Sharing</p>
                <p className="feature-description">
                  Landing Pages, User Flow, Wireframing, Prototyping, Mobile App
                  Design, Web App
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={SecurityIcon} alt=""></img>
                <p className="feature-name">Privacy & Security</p>
                <p className="feature-description">
                  Landing Pages, User Flow, Wireframing, Prototyping, Mobile App
                  Design, Web App
                </p>
              </div>
            </container>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
