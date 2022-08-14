import React,{useState,useEffect} from 'react';
import Search from "Assets/NavSearch.png";
import backArrow from 'Assets/back-arrow.png';
import './SearchBar.css';
import SearchedContactCard from "../ContactCard/SearchedContactCard"
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';


function SearchBar({changescreen,changeContact}) {

    const [contact,setContact] = useState([]);
    
    const searchContacts = (e) =>{

        if(e.target.value === ''){
            setContact([]);
        }else{
        
            axios
            .post("http://localhost:5000/chat/searchcontacts", {
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


    return (
        <div className="chat-list">
            <div className="search-header">
            {/* <div className='search-back-arrow' onClick={()=>{changeContact(true)}}><img src={backArrow} alt=''></img></div> */}
            <input className='search-input' type='text' placeholder='Search...' onChange={useDebouncedCallback(searchContacts,500)}></input>
            <div className='search-search'><img src={Search} alt=''></img></div>
            </div>

            
        <h2 className="recent-heading">Recent Chat</h2>
        <div className="recent-chat">


            {contact.map(contact =>{

                let chatDetails = {
                    username:contact.userName,
                    contact: `Contact: ${contact.phoneNumber}`,
                    timestamp: '',
                    messages:'',
                    userid:contact._id
                  };

             return <SearchedContactCard changescreen={changescreen} chatDetails={chatDetails}/>
            })}

        </div>
        </div>
        
      )
}

export default SearchBar