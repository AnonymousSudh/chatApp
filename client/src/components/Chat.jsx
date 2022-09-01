import React, { useState } from "react";
import { io } from "socket.io-client";
import { MessageBox } from "./MessageBox";

const socket = io.connect("http://localhost:8000");

const username = "Harshit";
const room = 1;

socket.emit("joinRoom",{ username, room } ,(error)=>{
    if(error){
        alert(error);
        return;
    }
    console.log("Joined Room");
});

socket.on("joinedRoom", (msg)=>{
    alert(msg);
});

socket.on("message", (message)=>{
    console.log(message.message);
    document.getElementById("messageBox").insertAdjacentHTML("beforeend", `<p>${message.message}</p>`);
})


export const Chat = props => {
    const [msg, setMessage] = useState("");

    const sendMessage = () => {
        if(msg.length > 0) {
            document.getElementById("sendMessage").setAttribute("disabled", "disabled");
            // Emit sendMsg event to server
            socket.emit("sendMessage", { message: msg }, (confirmation)=>{
                if(confirmation) alert(confirmation);
                else console.log("Message sent");

                // Remove disabled attribute after receiving confirmation
                document.getElementById("sendMessage").removeAttribute("disabled");
            })
        }
    }

    return (
        <div>
            <input onChange = { (e)=> setMessage(e.target.value) } id="message" />
            <button onClick = { sendMessage } id="sendMessage">Send</button>
        </div>
    );
}