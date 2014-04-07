var conn = null;

function connect()
{
	if(getId("textInput_ip").value == "" ||	getId("textInput_port").value == "")
	{
		connectionError("Rellene los campos correspondientemente.");
	}
	else if(isNaN(getId("textInput_port").value))
	{
		connectionError("El puerto debe ser un numero.");
	}
	else
	{
		var port = parseInt(getId("textInput_port").value);
		var host = "ws://"+getId("textInput_ip").value+":"+port;
		
		conn = new WebSocket(host); 
		conn.onopen = function(evt) { onOpen(evt) }; 
		conn.onclose = function(evt) { onClose(evt) }; 
		conn.onmessage = function(evt) { onMessage(evt) }; 
		conn.onerror = function(evt) { onError(evt) };
		getId("connection_state").innerHTML = "<h4 class='alert_success'>CONECTADO</h4>";
	}
}
function disconnect()
{
	conn.close();
	conn = null;
	getId("connection_state").innerHTML = "<h4 class='alert_error'>DESCONECTADO</h4>";
}

function onOpen(evt) { 
	if(conn != null)
	{
		alert("CONNECTED"); 
	}
}  
function onClose(evt) { 
	if(conn != null)
	{
		disconnect();
	}
}  
function onMessage(evt) { 
}  
function onError(evt) {
	connectionError("Socket obtuvo Error. Es posible que la direccion sea incorrecta.");
}



function connectionError(msg)
{
	var errorMsg = getId("connection_error");
	errorMsg.innerHTML = msg;
	errorMsg.style.display = "block";
}
function hideConnectionError()
{
	var errorMsg = getId("connection_error");
	errorMsg.innerHTML = "No Error";
	errorMsg.style.display = "none";
}

function getId(id)
{
	return document.getElementById(id);
}