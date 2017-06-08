var Core = Core || {};
Core.SocketsIO = Core.SocketsIO || {};

(function (module) {
	var socket;

    module.Subscribe=function(event,callback)
    {
        if(!socket)
        this.Init();
        
        socket.on(event,callback);
    };
    module.Send=function(event,data)
    {
        if(data)
            socket.emit(event,data);
        else
            socket.emit(event);
    };
    module.Init=function(){
        socket= io();
    };
})(Core.SocketsIO);

$(function () {
    Core.SocketsIO.Init();
});

