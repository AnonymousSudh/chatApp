const express = require('express');
const app = express(); // const app = require('express')();
const cors = require('cors')

 
const http = require('http');
const server = http.createServer(app);   //const server = require('http').createServer(app);
const { Server } = require("socket.io");
app.use(cors());

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});


const port = process.env.port||8000;

// app.get('/',(req,res)=>{
//     res.send("hello world")

// })
console.log("hello");

const allUser =[];
io.on('connection', (socket) => { // conncetion is an event which is inbuild in io
    
    console.log('a user connected with this id' ,socket.id);

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

console.log("hello2");




server.listen(port,()=>{
    console.log("listining to port no" , port);
})

