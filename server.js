var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');

var server = http.createServer(app).listen(8080);
app.use(express.static('public'));

console.log("server running");

var socket = require('socket.io');

app.get('/',(req,res)=>{
  fs.readFile('start.html', (error, data)=>{
    res.send(data.toString());
  });
});

app.get('/:room', (req,res)=>{
  fs.readFile('canvas.html', 'utf8', (error,data)=>{
    res.send(ejs.render(data,{
      data:{room: req.params.room}
    }));
      console.log(data.room);
  });
});

var io = socket(server);

io.sockets.on('connection', (socket)=>{

  console.log('new connection' + socket.id);

  var roomName="";
  var sentData = [];

  socket.on('joinRoom', (data)=>{
    roomName = data;
    socket.join(roomName);
    socket.on('save data', function sendData(data){
      var sentData = data;  
      io.sockets.in(roomName).emit('save data',data);
    })
    console.log(roomName);
    console.log(sentData);
    
  });

  socket.on('mouse', function mouseMsg(data){
    io.sockets.in(roomName).emit('mouse',data);
  });
  socket.on('canvas',function canvasChange(data){
    io.sockets.in(roomName).emit('canvas',data);
  });
  socket.on('colors',function colorChange(data){
    io.sockets.in(roomName).emit('colors',data);
  });


});
