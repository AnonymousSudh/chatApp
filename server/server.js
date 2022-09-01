const express = require('express');
const cors = require('cors')
const http = require('http');
const socketio = require("socket.io")

// Declarations
const app = express();
const server = http.createServer(app); 
const io = new socketio.Server(http, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

const PORT = process.env.PORT || 8000;

// Express Middleware
app.use(cors());

// Routes
app.route("/")
    .get((req, res)=>{
        return res.send("Server is running");
    })

const allUser =[];
io.on('connection', (socket) => { 
    console.log('New Connection');

    socket.on("joinUser",(name)=>{
        console.log(name);
        allUser.push({name,"id":socket.id})
        console.log(allUser);
    })
    
    
    socket.on("sendMsgg",(data)=>{
        console.log(data);
        if(data){

            socket.broadcast.emit("recivedmsg",data.msg);
            return;
        }
        // socket.broadcast.emit("recivedmsg","hello");
        // socket.broadcast.emit('hi');
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

