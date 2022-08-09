import React,{useState} from 'react';
import Collapsible from 'react-collapsible';
import uparrow from '../../../../Assets/up-arrow.png';
import downarrow from '../../../../Assets/down-arrow.png';
import gmi1  from "../../../../Assets/group-message-image-1.png";
import gmi2  from "../../../../Assets/group-message-image-2.png";
import './GroupMediaSection.css';


function GroupMediaSection() {

  const[active,setActive] = useState(false);

  return (
    <> <div className='group-media-container'>
        <div className='group-online-section'>
            <button className='group-online-collipsible-button' onClick={()=>{setActive(!active)}}><div>Members <span>14</span></div> <div className='group-collipsible-icon'><img src={active?uparrow:downarrow} alt=''></img></div></button>
            <div className={'online-collipsible-content ' + (!active?'':'show')}>
              
            <div className='online-members'>Online-3</div>
              <div className='online-list'>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name'>Tarun</div>
                </div>
            </div>

            <div className='online-members offline'>Offline-6</div>
              <div className='online-list'>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
                <div className='online-member'>
                  <div className='online-member-icon'><img src={gmi1} alt=''></img></div>
                  <div className='online-member-name offline'>Tarun</div>
                </div>
            </div>

            </div>


        </div>
        <div className='group-media-section'></div>
        <div className='group-files-section'></div>
        <div className='group-star-messages-section'></div>
    </div> 
    </>
  )
}

export default GroupMediaSection;