/**
 * arduino users:
 */


// objeto web socket user. (USO: wsu=new WS_User(nick,ws))
var SC_User = function(nick,socket) {
	// objeto websocket para comunicacion con el usuario.
	var name = nick;
	var id=-1;
	var enabled = false;
	var entra = function() {
		// funcion para añadirse al array...
		var a = this.sc_users.indexOf(null);
		if (a === -1) {
			this.sc_users.push(this);
			console.log('[Arduino] Miembro Apuntado, añadido! id:%d',this.sc_users.indexOf(this));
		} else {
			this.id=a;
			this.sc_users[a]=this;
			console.log('[Arduino] Miembro Apuntado! ocupando id:%d',a);
			//console.log('Usuarios leyendo arduino:',SC_User.sc_users);
		}
		enabled = true;
	};
	var sale = function() {
		var a = this.sc_users.indexOf(this);
		if (a === -1) {
			// No existe tal miembro!
			console.log('[Arduino] Miembro no apuntado a la lista!');
		} else {
			this.sc_users[a] = null;
			console.log('[Arduino] Miembro borrado! id=%d',a);
		}
		enabled = false;
	};
	// En el constructor ya se apunta el usuario...
	var get_list = function() {
		return this.sc_users;
	};
	
	var read = function(text){
		
	};
	var send = function(text){
		socket.emit("report", "", "Arduino: "+text);
	};
}
// static variable para toda la clase.
SC_User.sc_users=[];



// Export the class.
module.exports = SC_User;

//exports.X= WS_User.ws_users;

