$(function() {
	var host = "http://localhost";
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
			socket.emit("msg", $(this).val());
			$(this).val('');
		}
	});

	socket.on("msg", function(nick, msg) {
		addLine("<strong>[" + nick + "]: </strong>" + msg);
	});

	socket.on("report", function(msg) {
		addLine("<strong>[Server]: </strong>" + msg);
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

function showChat()
{

}