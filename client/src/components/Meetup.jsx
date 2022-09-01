import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:8000")


require('./meetup.css')




function Meetup() {

  const [msg, setMsg] = useState("");



  
  
  const sendMsg = async () => {
    console.log(msg);
    const data = document.createElement("h1")
    data.append(msg)
    const textmsg = document.getElementsByClassName("sender")[0].appendChild(data);
    document.getElementById("inputMsg").value = "";   
    socket.emit("sendMsgg", {msg:msg,id:socket.id});


  }

  socket.on("recivedmsg",(data)=>{
    // console.log("hh");
    console.log(data);
  })
  
  
  useEffect(() => {
    
    const name = prompt("hello")
    socket.emit("joinUser", name);
    
  }, [])

  return (
    <div className="main_div">

      <div>Meetup</div>
      <div className="chatDiv">
        <div className="chatBox">
          <div className="sender">
            <h1>i am sender</h1>
          </div>
          <div className="reciver">
            <h1>i am reciever</h1>
          </div>
        </div>

        <div className="msgBox">
          <input type="text" id='inputMsg' onChange={(e) =>setMsg(e.target.value)} />
          <button className='sendMsg' onClick={sendMsg}>send</button>
        </div>
      </div>

    </div>

  )
}

export default Meetup