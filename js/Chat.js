var crypto = require("crypto");

$(function() {
	
	var host = "http://172.16.1.9";
	var port = 14494;
	var nick;
	
	var socket = io.connect(host+":"+port);
  
	addLine("Conectando a "+ host+":"+port +"...");
  
	socket.on("connect", function() {
		setConection(true);
		addEnter();
		addLine("Esperando nick...");
		nick = prompt("Nick?");
		socket.emit("nick", nick);
		addLine(nick);
		addLine("...");
	});

	$('#msg-input input').keypress(function(e) {
		if (e.which == 13) {
			socket.emit("msg", encript($(this).val()));
			$(this).val('');
		}
	});

	socket.on("msg", function(nick, msg) {
		addLine("<strong>[" + nick + "]: </strong>" + decript(msg));
	});

	socket.on("report", function(msg) {
		addLine("<strong>[Server]: </strong>" + decript(msg));
	});

	socket.on("action", function(actionName){
		while(actionName == "repeatNick")
		{
			socket.emit("nick", prompt("Nick?"));
		}
	});

	socket.on("nicks", function(nicks) {
		$("#users").html('');
		for (var i = 0; i < nicks.length; i++) {
			$(document.createElement("li")).text(nicks[i]).appendTo("#users");
		}
	});

});
  
function addLine(msg)
{
  $(document.createElement("div"))
  .html(msg)
  .appendTo("#messages");

  $('#messages-container').scrollTop($('#messages').height());
}
function addEnter()
{
  $(document.createElement("br"))
  .html("")
  .appendTo("#messages");

  $('#messages-container').scrollTop($('#messages').height());
}

function setConection(state)
{
  if(state){
    document.getElementById("conection-status").style.color = "#00ff00";
    document.getElementById("conection-status").innerHTML = "Conectado.";
  }else{
    document.getElementById("conection-status").style.color = "#ff0000";
    document.getElementById("conection-status").innerHTML = "Desconectado.";
  }
}
/*
function showChat(state)
{
	if(state==true)
	{
		getID("login").style.display="block";
	}
	else
	{
		getID("login").style.display="none";
	}
}
function showLogin(state)
{
	if(state==true)
	{
		getID("container").style.display="block";
	}
	else
	{
		getID("container").style.display="none";
	}
}
function changeGUI(state)
{
	if(state==true)
	{
		showLogin(true);
		showChat(false);
	}
	else
	{
		showLogin(false);
		showChat(true);
	}
}
*/
function getID(id)
{
	return document.getElementById(id);
}
function encript(text)
{
	return crypto.createHash('md5').update(text).digest('hex');
}

function decript(cypth)
{
	return crypto.createDecipher('md5').update(cypth).toString("binary");
}