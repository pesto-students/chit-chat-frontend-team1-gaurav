import React,{useState} from 'react'
import NavMessage from "../../Assets/NavMessage.png"
import NavProfile from "../../Assets/NavProfile.png"
import NavSearch from "../../Assets/NavSearch.png"
import "./SideBar.css"
export default function SideBar() {
 
 const [active,setActive]=useState('message');

 const onClickHandler=(e)=>{
    setActive(e.target.getAttribute('name'));
    console.log('check',e.target.getAttribute('name'))
    console.log('active',active)
 }
    return (
    <div className="navigation">
        <ul>
          <li name='message' onClick={onClickHandler} className={active==='message' && 'active'}>
            <img name='message' onClick={onClickHandler} src={NavMessage} />
          </li>
          <li name='search' onClick={onClickHandler} className={active==='search' && 'active'}>
            <img name='message' onClick={onClickHandler} src={NavSearch} />
          </li>
          <li name='profile' onClick={onClickHandler} className={active==='profile' && 'active'}>
            <img name='message' onClick={onClickHandler} src={NavProfile} />
          </li>
        </ul>
    </div>
  )
}
