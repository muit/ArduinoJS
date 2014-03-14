console.log("*************\n*CHAT SERVER*\n*************\n*Muit Fos   *\n*************\n");
var port = 14494;
var io = require("socket.io").listen(port);
var nicks = [];

io.set('log level', 1);

console.log("\nEscuchando puerto "+ port);

io.sockets.on("connection", function(socket) {
  
  socket.on("nick", function(nick) {
    if(nick==null)
    {
      socket.emit("report", "Recargue la pagina para comenzar de nuevo.");
    }
    else if(nicks.indexOf(nick)==-1)
    {
	  console.log("** '"+nick+"' se ha conectado.");
      nicks.push(nick);
      io.sockets.emit("nicks", nicks);

      socket.on("msg", function(msg) {
		  var digital = new Date();
		  console.log("["+digital.getHours()+":"+digital.getMinutes()+":"+digital.getSeconds()+"] '"+nick+"': "+msg);
          io.sockets.emit("msg", nick, msg);
      });
	  
      socket.on("disconnect", function() {
	      console.log("** '"+nick+"' se ha desconectado.");
          nicks.splice(nicks.indexOf(nick), 1);
          io.sockets.emit("nicks", nicks);
      });
    }
    else
    {
      console.log("** '"+nick+"' ya existe. Usuario Rechazado.");
      socket.emit("report", "Ese nick ya existe");
      socket.emit("action", "repeatNick");
    }
    
  });
});
