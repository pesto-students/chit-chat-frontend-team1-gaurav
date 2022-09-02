import React, { useState, useEffect } from "react";
import Search from "Assets/NavSearch.png";
import Close from "Assets/close-icon.png";
import AddParticipantContactCard from "Common/ContactCard/AddParticpantContactCard";
import axios from "axios";
import closeWhite from 'Assets/cross-thin.png';
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddParticipant({ setShowPopup, groupid, groupMembers }) {
  const [contact, setContact] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  let navigate = useNavigate();

  const searchContacts = (e) => {
    if (e.target.value === "") {
      setContact([]);
    } else {
      axios
        .post("http://localhost:5000/chat/searchcontacts", {
          userid: localStorage.getItem("userid"),
          text: e.target.value,
        })
        .then((res) => {
          console.log("contacts", res.data);
          let groupMembersArray = groupMembers.map((member) => member.userid);
          let filteredContacts = res.data.filter((contact) => {
            return !groupMembersArray.includes(contact._id);
          });
          setContact(filteredContacts);
        })
        .catch((err) => {
          setContact([]);
        });
    }
  };

  const addParticipantsHandler = async () => {
    console.log(
      "selected contacts",
      selectedContacts,
      localStorage.getItem("userid")
    );
    try {
      let res = await axios.post("http://localhost:5000/group/addParticipant", {
        userid: localStorage.getItem("userid"),
        groupid: groupid,
        addParticipants: selectedContacts,
      });
      console.log("response", res);
      toast.success("Members added");
    } catch (err) {
      console.log("error", err);
    }
    setShowPopup(false);
  };

  let styles = {
    container: {
      position: "absolute",
      width: "50%",
      minHeight: "50%",
      height: "auto",
      placeSelf: "center",
      borderRadius:'10px',
      border:'none',
      animation: 'popup .35s linear',
      transformOrigin: '90% -90%'
    },
    modalBackground : {
      position: 'fixed',
      top:'0',
      right:'0',
      height:'100vh',
      width:'100vw',
      background:'#000000',
      opacity:'.8',
      animation:'fadeincontact .3s',
    }
  };

  return (<>
    <div style={styles.modalBackground}></div>
    <div style={styles.container} className="chat-list">
      <div className="search-header">
        <input
          className="search-input"
          type="text"
          placeholder="Search for participants..."
          onChange={useDebouncedCallback(searchContacts, 500)}
        ></input>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "60px",
          }}
          className="search-search"
        >
          <img style={{ marginRight: "20px" }} src={Search} alt=""></img>{" "}
          <img
            onClick={() => {
              setShowPopup(false);
            }}

            src={closeWhite}
            alt=""
          ></img>
        </div>
      </div>

      <div className="recent-chat">
        {contact.map((contact) => {
          let chatDetails = {
            username: contact.userName,
            contact: `Contact: ${contact.phoneNumber}`,
            timestamp: "",
            messages: "",
            userid: contact._id,
          };

          return (
            <AddParticipantContactCard
              key={chatDetails.userid}
              chatDetails={chatDetails}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
            />
          );
        })}
      </div>
      <div style={{ marginTop: "20px" }} className="button-wrapper">
        <button
          onClick={addParticipantsHandler}
          className="create-group-button"
        >
          Add Participants
        </button>
      </div>
    </div>
    </>
  );
}

export default AddParticipant;
