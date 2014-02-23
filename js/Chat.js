$(function() {
  var socket = io.connect("http://localhost:8080");

  socket.on("connect", function() {
      socket.emit("nick", prompt("Nick?"));
  });

  $('#msg-input input').keypress(function(e) {
      if (e.which == 13) {
          socket.emit("msg", $(this).val());
          $(this).val('');
      }
  });

  socket.on("msg", function(nick, msg) {
      $(document.createElement("div"))
      .html("<strong>" + nick + ": </strong>" + msg)
      .appendTo("#messages");

      $('#messages-container').scrollTop($('#messages').height());
  });

  socket.on("nicks", function(nicks) {
      $("#users").html('');
      for (var i = 0; i < nicks.length; i++) {
          $(document.createElement("li")).text(nicks[i]).appendTo("#users");
      }
  });

});