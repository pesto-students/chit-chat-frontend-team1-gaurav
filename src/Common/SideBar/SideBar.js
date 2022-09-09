/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import NavMessage from "Assets/NavMessage.png";
import NavProfile from "Assets/NavProfile.png";
import NavSearch from "Assets/NavSearch.png";
import CreateGroup from "Assets/CreateGroup.png";
import logout from "Assets/logout.png";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

export default function SideBar({socket}) {

  let navigate = useNavigate();

  const [active, setActive] = useState("message");

  const onClickHandler = (e) => {
    setActive(e.target.getAttribute("name"));

    if (e.target.getAttribute("name") === "message") {
      navigate("/chat");
    } else if (e.target.getAttribute("name") === "profile") {
      navigate("/profile");
    }
  };

  const searchHandler = () => {
    setActive("search");
    navigate("/search");
  };

  const groupHandler = () => {
    setActive("group");
    navigate("/creategroup");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    socket.current.disconnect();
    navigate("/home");
  };

  // set active in side bar 
  useEffect(() => {
    if (window.location.pathname === "/profile") {
      setActive("profile");
    } else if (window.location.pathname === "/search") {
      setActive("search");
    }

    if (window.location.pathname === "/creategroup") {
      setActive("group");
    }
  }, []);

  return (
    <div className="navigation">
      <div></div>

      <ul>
        <li
          name="message"
          onClick={onClickHandler}
          className={active === "message" && "active"}
        >
          <img name="message" onClick={onClickHandler} src={NavMessage} />
        </li>
        <li
          name="search"
          onClick={searchHandler}
          className={active === "search" && "active"}
        >
          <img name="search" onClick={searchHandler} src={NavSearch} />
        </li>
        <li
          name="profile"
          onClick={onClickHandler}
          className={active === "profile" && "active"}
        >
          <img name="profile" onClick={onClickHandler} src={NavProfile} />
        </li>
        <li
          name="group"
          onClick={groupHandler}
          className={active === "group" && "active"}
        >
          <img name="group" onClick={onClickHandler} src={CreateGroup} />
        </li>
      </ul>

      <ul>
        <li name="logout" onClick={logoutHandler}>
          <img name="logout" src={logout} />
        </li>
      </ul>
    </div>
  );
}
