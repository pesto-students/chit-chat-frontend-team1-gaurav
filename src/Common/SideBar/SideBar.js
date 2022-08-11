/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useEffect} from 'react'
import NavMessage from "../../Assets/NavMessage.png"
import NavProfile from "../../Assets/NavProfile.png"
import NavSearch from "../../Assets/NavSearch.png"
import logout from "../../Assets/logout.png"
import { useNavigate } from "react-router-dom";
import "./SideBar.css"


export default function SideBar() {
 
  let navigate = useNavigate();


 const [active,setActive]=useState('message');

 const onClickHandler=(e)=>{
    setActive(e.target.getAttribute('name'));
    console.log('check',e.target.getAttribute('name'))
    console.log('active',active)

    if(e.target.getAttribute('name') === 'message')
    {
      navigate('/chat')
    }
    else if(e.target.getAttribute('name') === 'profile')
    {
      navigate('/profile')
    }

 }

 const logoutHandler = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  localStorage.removeItem('username');
  navigate('/');
 }

  useEffect(() => {
      if(window.location.pathname === '/profile'){
        setActive('profile')
      }
  }, [])
  

    return (
    <div className="navigation">

      <div></div>

        <ul>
          <li name='message' onClick={onClickHandler} className={active==='message' && 'active'}>
            <img name='message' onClick={onClickHandler} src={NavMessage} />
          </li>
          <li name='search' onClick={onClickHandler} className={active==='search' && 'active'}>
            <img name='search' onClick={onClickHandler} src={NavSearch} />
          </li>
          <li name='profile' onClick={onClickHandler} className={active==='profile' && 'active'}>
            <img name='profile' onClick={onClickHandler} src={NavProfile} />
          </li>
        </ul>


        <ul >
          <li name='logout'  onClick={logoutHandler}>
            <img name='logout'  src={logout} />
          </li>
          
        </ul>
        
    </div>
  )
}
