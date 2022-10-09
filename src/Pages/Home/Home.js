import React,{useState} from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import 'animate.css';
import "./Home.css";


toast.configure();



function Home() {
  let navigate = useNavigate();

  const[email,setEmail] = useState('')

  const subscribe = () => {
    if(email === ''){
      toast.warning("Please Enter Email", { autoClose: 1000 });
    }
    else{
      toast.success("Subscribed Successfully", { autoClose: 1000 });
      setEmail('')
    }
  }

  return (
    <>
      <header className="header">
        <navbar className="navbar">
          <div className="home-logo">
            <img src={Logo} alt="chit-chat"></img>
          </div>
          <div className="nav-links">
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/login")}>Login</li>
              <li onClick={() => navigate("/signup")}>Signup</li>
              <li>Blog</li>
            </ul>
          </div>
        </navbar>
        <div className="header-body">
          <div className="header-desc">
            <h1 className="header-h1 animate__bounceInLeft">
              Connect Anywhere, Anytime
            </h1>
            <p className="header-one-liner">
              we create our buildings and then they create us. Likewise, we help
              you construct your circle of friends and your communities and then
              they construct you
            </p>
            <div className="get-started">Interested?Get Started</div>
            <button className="home-login" onClick={() => navigate("/login")}>Login</button>
          </div>
          <div className="header-right-section">
            <img src={rightImg} alt=""></img>
          </div>

          <div className="hero-guy">
            <img src={heroguy} alt=""></img>
          </div>
          <div className="hero-girl">
            <img src={herogirl} alt=""></img>
          </div>
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
                  Seamless Messaging Experience, message anyone, anywhere, anytime.
                  Connect with your friend and family.
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={GroupIcon} alt=""></img>
                <p className="feature-name">Group Chat</p>
                <p className="feature-description">
                  We provide feature to create group chat room where u can chill with buddies,family or colleagues.
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={Videogif} alt=""></img>
                <p className="feature-name">Video Call</p>
                <p className="feature-description">
                  Communicate via video call to your faviourite person or business partner.
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
                  Transfer images or document via media sharing feature. stay updated to latest trends.
                </p>
              </div>
            </container>

            <container className="feature-container">
              <div className="feature-card">
                <img className="feature-logo" src={SecurityIcon} alt=""></img>
                <p className="feature-name">Privacy & Security</p>
                <p className="feature-description">
                  Communicate fully securirly via end-to-end encryption. your data is also secure with us.
                </p>
              </div>
            </container>
          </div>
        </div>
      </section>

      <section className="write-us">
        <h1 className="feature-header">Subscribe Us!</h1>
        <div className="offer-container">
          <div class="latest-caption">
            <h2>
              Get Our
              <br />
              Latest Offers News
            </h2>
            <p>Subscribe news latter</p>
          </div>

          <div class="latest-subscribe">
            <form action="#">
              <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Your email here" />
              <button onClick={subscribe}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
