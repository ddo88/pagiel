module.exports = function(app){
    var io=require('socket.io')(app);

    io.on('connection',function(socket){
        console.log('connection socke io');
         socket.on('message', function(msg){
            console.log('message: ' + msg);
        });

        socket.on('commandEvent',function(message){
            socket.broadcast.emit('presentationEvent',message);
        });
    });

};