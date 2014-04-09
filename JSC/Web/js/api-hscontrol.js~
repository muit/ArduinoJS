var conn = null;
var digitalPins = new Array();
var inOutPins = new Array();
var analogPins = new Array();

function loadJSC()
{
	for(var i = 0; i < 14; i++)
	{
		setInOutState(i, false);
		setDigitalPinState(i, false);
	}
	
	for(var i = 0; i < 6; i++)
	{
		setAnalogPinState(i, 0);
	}
}

function connect(hostVar, portVar)
{
	
		var port = parseInt(portVar);
		var host = "ws://"+hostVar+":"+port;
		
		conn = new io.socket(host); 
		conn.onopen = function(evt) { onOpen(evt) }; 
		conn.onclose = function(evt) { onClose(evt) }; 
		conn.onmessage = function(evt) { onMessage(evt) }; 
		conn.onerror = function(evt) { onError(evt) };
		getId("connection_state").innerHTML = "<h4 class='alert_success'>CONECTADO</h4>";
		
		
		var errorMsg = getId("connection_error");
		errorMsg.innerHTML = "";
		errorMsg.style.display = "none";		
		
	}
}
function disconnect()
{
	conn.close();
	conn = null;
	getId("connection_state").innerHTML = "<h4 class='alert_error'>DESCONECTADO</h4>";
}

function onOpen(evt) { 
	conn.send("ping");
}  
function onClose(evt) { 
	if(conn != null)
		disconnect();
}  
function onMessage(evt) {
	var args = (evt.data).toString().split(" ");
	switch(args[0])
	{
	case "set":
		if(args[1] == "digital")
		{
			setDigitalPinState(parseInt(args[2]), parseBool(args[3]));
			break;
		}
		else if(args[1] == "analog")
		{
			setAnalogPinState(parseInt(args[2]), parseInt(args[3]));
			break;
		}
	case "digitaltype":
		if(args[2] == "input")
		{
			setInOutState(parseInt(args[1]),true);
			break;
		}
		else if(args[2] == "output")
		{
			setInOutState(parseInt(args[1]), false);
			break;
		}
	case "pong":
		alert("Pong!");
		break;
	default:
		//Data no reconocida
		alert("Data desconocida.");
		break;
	}
}  
function onError(evt) {
	connectionError("Socket obtuvo Error. Es posible que la direccion sea incorrecta.");
}

function ping()
{
	if(conn != null)
		conn.send("ping");
	else 
		connectionError("Conecte al servidor primero.");
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

function invertValue(id)
{
	if(!inOutPins[id])
		setDigitalPinState(id, !digitalPins[id]);
}

function getId(id)
{
	return document.getElementById(id);
}


function setDigitalPinState(id, state){
	digitalPins[id] = state;
	conn.send("set digital "+id+" "+state);
}
function setAnalogPinState(id, state){
	analogPins[id] = state;
	conn.send("set analog "+id+" "+state);
}
function setInOutState(id, state){
	inOutPins[id] = state;
	conn.send("set inout "+id+" "+state);
}
function getDigitalPinState(id){ return digitalPins[id];}
function getAnalogPinState(id){ return analogPins[id];}
function getInOutState(id){ return inOutPins[id];}


//EVENTS/////////////////////////////////////

function onChangeValue(id, state)
{
	if(state == true || state == false)
		setDigitalPinState(id, state);
	else
		setAnalogPinState(id, state);
}

//UTIL///////////////////////////////

