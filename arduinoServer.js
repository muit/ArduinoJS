var http = require('http');
var fs = require('fs');
var conect;

/*
var head;
var body;

fs.readFile('./head.html', function (err, html) {
    if (err) 
	{
        throw err; 
    }  
	head = html;
});
fs.readFile('./body.html', function (err, html) {
    if (err) 
	{
        throw err; 
    }  
	body = html;
});
*/
setInterval(function()
{
	console.log("\n\nConectando Con arduino...");
	if(!conect)
	{
		conect = arduinoConect();
		if(conect) 
			console.log("\nConexion satisfactoria.");
		else 
			console.log("\nError conectando. Reintentando en 2 segundos.");
	}
	conect = arduinoPing();
	
}, 2000);

http.createServer(
function(request, response) 
{
	console.log("Petición de id:0...");
	response.writeHeader(200, {"Content-Type": "text/html"});  
	
	if(conect)
	{
		response.write(getValue(0));  
	}
	else
		response.write("\nSin conexión.");
	
	response.end();  
}
).listen(8000);

http.createServer(
function(request, response) 
{  
	console.log("Petición de id:1...");
	response.writeHeader(200, {"Content-Type": "text/html"}); 
	
	if(conect)
		response.write(getValue(1));   
	else
		response.write("\nSin conexión."); 
		
	response.end();  
}
).listen(8001);

http.createServer(
function(request, response) 
{  
	console.log("Petición de id:2...");
	response.writeHeader(200, {"Content-Type": "text/html"});  
	
	if(conect)
		response.write(getValue(2));  
	else
		response.write("\nSin conexión.");
		
	response.end();  
}
).listen(8002);

http.createServer(
function(request, response) 
{  
	console.log("Petición de id:3...");
	response.writeHeader(200, {"Content-Type": "text/html"});  
	
	if(conect)
		response.write(getValue(3));  
	else
		response.write("\nSin conexión.");
		
	response.end();  
}
).listen(8003);







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