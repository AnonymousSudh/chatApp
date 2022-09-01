import { io } from "socket.io-client";

export const Chat = props => {
    const socket = io.connect("http://192.168.1.7:8000", {
        rejectUnauthorized: false
    });
    socket.on("connect", ()=>{
        console.log(socket.id);
    })

    return (
        <div>
            <input id="message" />
            <button>Send</button>
        </div>
    );
}