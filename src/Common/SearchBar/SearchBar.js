import React, { useState } from "react";
import Search from "Assets/NavSearch.png";
import "./SearchBar.css";
import SearchedContactCard from "../ContactCard/SearchedContactCard";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { useSelector } from "react-redux";

function SearchBar({ changescreen }) {

  const state = useSelector((state) => state.SingleChatReducer);
  var { currentContacts } = state;

  const [contact, setContact] = useState([]);

  const searchContacts = (e) => {
    if (e.target.value === "") {
      setContact([]);
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER}/chat/searchcontacts`, {
          userid: localStorage.getItem("userid"),
          text: e.target.value,
        })
        .then((res) => {
          let currentcontacts = currentContacts.map((item) => {
            return item.userid;
          });

          let finalContacts = res.data.filter((contact) => {
            return !currentcontacts.includes(contact._id);
          });

          setContact(finalContacts);
        })
        .catch((err) => {
          setContact([]);
        });
    }
  };

  return (
    <div className="chat-list">
      <div className="search-header">
        {/* <div className='search-back-arrow' onClick={()=>{changeContact(true)}}><img src={backArrow} alt=''></img></div> */}
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          onChange={useDebouncedCallback(searchContacts, 500)}
        ></input>
        <div className="search-search">
          <img src={Search} alt=""></img>
        </div>
      </div>

      <h2 className="recent-heading">Recent Contacts</h2>
      <div className="recent-chat">
        {contact.map((contact,index) => {
          let chatDetails = {
            username: contact.userName,
            contact: `Contact: ${contact.phoneNumber}`,
            timestamp: "",
            messages: "",
            userid: contact._id,
          };

          return (
            <SearchedContactCard
              key={index}
              changescreen={changescreen}
              chatDetails={chatDetails}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
