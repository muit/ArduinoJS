var io = require("socket.io").listen(8080);
var nicks = [];

io.sockets.on("connection", function(socket) {

  socket.on("nick", function(nick) {
      nicks.push(nick);
      io.sockets.emit("nicks", nicks);

      socket.on("msg", function(msg) {
          io.sockets.emit("msg", nick, msg);
      });
	  
      socket.on("disconnect", function() {
          nicks.splice(nicks.indexOf(nick), 1);
          io.sockets.emit("nicks", nicks);
      });
  });
});




function arduinoConect()
{
	//Conexión
	//devuelve true si es una conexion exitosa
}
function arduinoDisconect()
{
	//Desconexion
}
function arduinoPing()
{
	//devuelve estado de la conexion si es necesario.
	//true conectado - false desconectado
}
function setValue(int id, int value)
{
	//Set de datos a arduino 
}
function getValue(int id)
{
	if(conect)
	{
		//Obtencion de datos de arduino
		//dependiendo del id ingresado
		//return *****
		console.log("Dato("+id+") proporcionado.");
		return "null"
	}
	else
	{
		return "null"
	}
}