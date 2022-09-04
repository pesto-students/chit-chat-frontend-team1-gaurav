import React,{useState,useRef,useEffect} from 'react';
import './VideoScreen.css';
import { Peer } from "peerjs";


function VideoScreen({remotePeerIdValue}) {

const [peerId,setPeerId]=useState('');
const currentUserVideoRef=useRef(null);
const remoteVideoRef=useRef(null) 
const peerInstance=useRef(null);


useEffect(() => {
  const peer=new Peer();
  
  peer.on('open',id=>{
    setPeerId(id);
  })

  peer.on('call',call=>{
    alert("Answer the call")
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozkitGetUserMedia

    getUserMedia({video:true,audio:true},mediaStream =>{
    currentUserVideoRef.current.srcObject=mediaStream;
    currentUserVideoRef.current.play();

    call.answer(mediaStream);
    call.on('stream',(remoteStream)=>{
      remoteVideoRef.current.srcObject=remoteStream;
      remoteVideoRef.current.play();
    })  
  })
  })

  peerInstance.current=peer;
}, [])

const callHandler=(peerId)=>{
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozkitGetUserMedia
   
  getUserMedia({video:true,audio:true},mediaStream =>{
    currentUserVideoRef.current.srcObject=mediaStream;
    currentUserVideoRef.current.play();
    
    const call = peerInstance.current.call(peerId, mediaStream)
    call.on('stream',(remoteStream)=>{
      remoteVideoRef.current.srcObject=remoteStream;
      remoteVideoRef.current.play();
    })
  })


}


return (
    <div className='Video-Container'>
         <div className='Receiver-Screen'>  <video ref={currentUserVideoRef}/>
            <div className='sender-screen'> <video ref={remoteVideoRef}/> </div>
        </div>
    </div>
);

}

export default VideoScreen