import React, { useState } from "react";
import Search from "Assets/NavSearch.png";
import AddParticipantContactCard from "Common/ContactCard/AddParticpantContactCard";
import axios from "axios";
import closeWhite from "Assets/cross-thin.png";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getMembersArray } from "Redux/Actions/GroupChatActions";


function AddParticipant({ setShowPopup, groupid, groupMembers }) {

  const dispatch = useDispatch();

  const [contact, setContact] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

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
    try {

      await axios.post(`${process.env.REACT_APP_SERVER}/group/addParticipant`, {
        userid: localStorage.getItem("userid"),
        groupid: groupid,
        addParticipants: selectedContacts,
      })
      .then(res => {
        if(res.data.statusCode === 204){
          toast.success("Members added");
          dispatch(getMembersArray(groupid));
        }
        else if(res.data.statusCode === 403){
          toast.warning(res.data.message);
        }
      })
      
      ;
      
      
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
      borderRadius: "10px",
      border: "none",
      animation: "popup .35s linear",
      transformOrigin: "90% -90%",
    },
    modalBackground: {
      position: "fixed",
      top: "0",
      right: "0",
      height: "100vh",
      width: "100vw",
      background: "#000000",
      opacity: ".8",
      animation: "fadeincontact .3s",
    },
  };

  return (
    <>
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
