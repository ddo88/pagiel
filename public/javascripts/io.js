var socket;
$(function () {
     socket = io();
     socket.emit('message',"demo");
     socket.on('x',function(data){ alert(data);});
});

