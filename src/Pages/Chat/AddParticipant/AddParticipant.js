import React,{useState,useEffect} from 'react';
import Search from "Assets/NavSearch.png";
import AddParticipantContactCard from "Common/ContactCard/AddParticpantContactCard";
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function AddParticipant({setShowPopup,groupid}) {

    const [contact,setContact] = useState([]);
    const [selectedContacts,setSelectedContacts]=useState([]);
    
    let navigate = useNavigate();


    const searchContacts = (e) =>{

        if(e.target.value === ''){
            setContact([]);
        }else{
        
            axios
            .post("http://localhost:5000/chat/searchcontacts", {
                userid:localStorage.getItem('userid'),
                text:e.target.value
            })
            .then((res) => {
                
                setContact(res.data);
            })
            .catch((err) => {
                setContact([]);
            });
        }
    }

    const addParticipantsHandler=async()=>{
          console.log('selected contacts',selectedContacts,localStorage.getItem('userid'));
          try{
           let res=await axios.post("http://localhost:5000/group/addParticipant",{
            userid:localStorage.getItem('userid'),
            groupid:groupid,
            addParticipants:selectedContacts
           })
           console.log('response',res);
           toast.success('Members added')
          }
          catch(err){
            console.log('error',err);
          }
          setShowPopup(false);
    }

    
    let styles={
        container:{
            position:'absolute',
            width:'80%',
            height:'60%',
            justifySelf:'center',
            alignSelf:'center'
        }
    }

    return (
        <div style={styles.container}  className="chat-list">
            <div className="search-header">
            <input className='search-input' type='text' placeholder='Search for participants...' onChange={useDebouncedCallback(searchContacts,500)}></input>
            <div className='search-search'><img src={Search} alt=''></img></div>
            </div>

            
        
        <div className="recent-chat">


            {contact.map(contact =>{

                let chatDetails = {
                    username:contact.userName,
                    contact: `Contact: ${contact.phoneNumber}`,
                    timestamp: '',
                    messages:'',
                    userid:contact._id
                  };

             return <AddParticipantContactCard key={chatDetails.userid} chatDetails={chatDetails} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/>
            })}

        </div>
        <div style={{marginTop:'20px'}} className='button-wrapper'>
        <button onClick={addParticipantsHandler} className='create-group-button'>Add Participants</button>
        </div>
        
        </div>
        
      )
}

export default AddParticipant
