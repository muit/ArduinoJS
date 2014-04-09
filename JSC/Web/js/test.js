
function load()
{
	loadJSC();
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
		connect(getId("textInput_ip").value, getId("textInput_port").value);
	}
}


function invertValue(id)
{
	if(!getInOutState(id))
		setDigitalPin(id, !getDigitalPinState(id));
}


function setDigitalPin(id, state){
	setDigitalPinState(id, state);
	if(state == true)
	{
		getId("pin_"+id+"_state").style.backgroundColor = "#00ff41";
		getId("pin_"+id+"_state").innerHTML = "TRUE";
	}
	else
	{
		getId("pin_"+id+"_state").style.backgroundColor = "#ff0000";
		getId("pin_"+id+"_state").innerHTML = "FALSE";
	}
}
function setAnalogPin(id, state){
	setAnalogPinState(id, state);
	getId("analog_"+id+"_state").innerHTML = state;
}
function setInOutPin(id, state){
	setInOutState(id, state);
	if(state == true)
	{
		getId("pin_"+id+"_btn").className = "";
		getId("inOut_"+id).innerHTML = "INPUT";
	}
	else
	{
		getId("pin_"+id+"_btn").className = "alt_btn";
		getId("inOut_"+id).innerHTML = "OUTPUT";
	}
}

//UTIL////

function getId(id){
	return document.getElementById(id);
}
function parseBool(val){
	return val == "true";
}
