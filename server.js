var express = require('express');
var app = express();

var server = app.listen(8080);
app.use(express.static('public'));

console.log("server running");

var socket = require('socket.io');

var io = socket(server);
io.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection' + socket.id);

  socket.on('mouse', mouseMsg);
  socket.on('canvas', canvasChange);
  socket.on('colors', colorChange);

  function mouseMsg(data){
    socket.broadcast.emit('mouse' ,data);
    // console.log(data);
  }
  function canvasChange(data){
    socket.broadcast.emit('canvas', data);
    // console.log(data);
  }
  function colorChange(data){
    socket.broadcast.emit('colors' ,data);

  }
}
