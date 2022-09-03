import React,{useState,useEffect} from 'react';
import Search from "Assets/NavSearch.png";
import backArrow from 'Assets/back-arrow.png';
import './GroupSearch.css';
import GroupSearchContactBar from "../ContactCard/GroupSearchContactBar"
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function GroupSearch({changescreen,changeContact}) {

    const [contact,setContact] = useState([]);
    const [groupName, setGroupName]=useState('');
    const [selectedContacts,setSelectedContacts]=useState([]);
    
    let navigate = useNavigate();


    const searchContacts = (e) =>{

        if(e.target.value === ''){
            setContact([]);
        }else{
        
            axios
            .post(`${process.env.REACT_APP_SERVER}/chat/searchcontacts`, {
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

    let groupNameHandler=(e)=>{
        setGroupName(e.target.value);
    }

    let createGroupHandler=()=>{
        
        let validationStatus=validate();
        let userid= localStorage.getItem('userid');
        let username=localStorage.getItem('username')
        if(validationStatus){
            axios
            .post(`${process.env.REACT_APP_SERVER}/group/creategroup`, {
                user:{userid,username},
                groupmembers:selectedContacts,
                groupname:groupName
            })
            .then((res) => {
               toast.success('Group Created')
               setGroupName('');
               setSelectedContacts([]);
               navigate('/Chat')
            })
            .catch((err) => {
               toast.error(err.message)
            });
        }
        else{

        }
        
    }

    let validate=()=>{
        if(groupName==''){
            toast.error('Enter a group Name');
        return false
        }

        if(selectedContacts.length==0){
            toast.error('Select one or more contacts');
        return false    
        }
    return true
    }


    return (
        <div className="chat-list">
            <div className='search-group-header'>
                <input value={groupName} onChange={groupNameHandler} className='search-group-input' type='text' placeholder='Enter Group Name'/>
            </div>
            <div className="search-header">
            {/* <div className='search-back-arrow' onClick={()=>{changeContact(true)}}><img src={backArrow} alt=''></img></div> */}
            <input className='search-input' type='text' placeholder='Search...' onChange={useDebouncedCallback(searchContacts,500)}></input>
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

             return <GroupSearchContactBar changescreen={changescreen} chatDetails={chatDetails} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/>
            })}

        </div>
        <div style={{marginTop:'20px'}} className='button-wrapper'>
        <button onClick={createGroupHandler} className='create-group-button'>Create Group</button>
        </div>
        
        </div>
        
      )
}

export default GroupSearch