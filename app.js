require('dotenv').config();
const path=require('path')
const express=require("express");
const app=express()
const cors=require('cors')
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200', 
      methods: ['GET', 'POST','PUT','DELETE']
    }
  });

app.locals.io = io;
app.use(express.json())
app.use(bodyParser.json({ limit: '100mb' }));

app.use(cors())
require('./src/database/db')
require('./src/routes')(app);

let cartCounts = new Map(); 

io.on('connection', (socket) => {
    console.log('Connected to WebSocket.');
    cartCounts.set(socket.id, 0);

    socket.on('add-to-cart', (data) => {
      const currentCount = cartCounts.get(socket.id) || 0;
      const newCount = currentCount + data.quantity;
      cartCounts.set(socket.id, newCount); 
      socket.emit('cart-updated', newCount);
  });

  
  socket.on('reset-cart', () => {
      cartCounts.set(socket.id, 0); 
      socket.emit('cart-updated', 0); 
  });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket.');
      cartCounts.delete(socket.id);
    });
  });

const PORT=8000 || process.env.PORT 

server.listen(PORT,(req,res)=>{
    console.log(`Server started at ${PORT}`);
})

module.exports=app
