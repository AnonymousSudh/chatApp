const express = require('express');
const cors = require("cors");
const http = require('http');
const socketio = require("socket.io")

// Declarations
const app = express();
const server = http.createServer(app); 

app.use(cors());

const io = new socketio.Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

const PORT = process.env.PORT || 8000;

// Express Middleware

// Routes
app.route("/")
    .get((req, res)=>{
        return res.send("Server is running");
    })

let users = 0
const allUser =[];
io.on('connection', (socket) => { 
    console.log('New Connection', socket.id);

    socket.on("joinRoom",({ username, room }, cb)=>{
       console.log(username, room);

       // Join the room with the given room id.
       socket.join(room);

       // Emit the joinRoom event to the client.
       socket.emit("joinedRoom", "Joined the chat room");

       socket.on("sendMessage", (message, cb)=>{
        console.log("Message from client: ", message);
        io.to(room).emit("message", message);
        cb();
       })
    })
    
    
    socket.on("sendMsg",({ message }, cb)=>{
        console.log(message);
        socket.emit("message", message);
        cb()
    })

    // socket.on("")
    socket.on("disconnect",()=>{
        console.log("disconnected", socket.id);
        allUser.pop(socket.id)
    }) 


  });


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

