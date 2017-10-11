$(document).ready(function(){
  var socket = io.connect();

  $('.container > button').click(function(){
    var room = $('#room').val();

    socket.emit('joinRoom',room);
    console.log(room);
    location = room
  });

});
