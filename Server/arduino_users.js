/**
 * arduino users:
 */


// objeto web socket user. (USO: wsu=new WS_User(nick,ws))
function SC_User(nick,socket) {
	// objeto websocket para comunicacion con el usuario.
	this.name = nick;
	this.id=-1;
	this.enabled = false;
	this.entra = function() {
		// funcion para añadirse al array...
		var a = SC_User.sc_users.indexOf(null);
		if (a === -1) {
			SC_User.sc_users.push(this);
			console.log('[Arduino] Miembro Apuntado, añadido! id:%d',SC_User.sc_users.indexOf(this));
		} else {
			this.id=a;
			SC_User.sc_users[a]=this;
			console.log('[Arduino] Miembro Apuntado! ocupando id:%d',a);
			//console.log('Usuarios leyendo arduino:',SC_User.sc_users);
		}
		enabled = true;
	};
	this.sale = function() {
		var a = SC_User.sc_users.indexOf(this);
		if (a === -1) {
			// No existe tal miembro!
			console.log('[Arduino] Miembro no apuntado a la lista!');
		} else {
			SC_User.sc_users[a] = null;
			console.log('[Arduino] Miembro borrado! id=%d',a);
		}
		enabled = false;
	};
	// En el constructor ya se apunta el usuario...
	var get_list = function() {
		return SC_User.sc_users;
	};
	
	this.read = function(text){
		
	};
	this.send = function(text){
		socket.emit("report", "", "Arduino: "+text);
	};
}
// static variable para toda la clase.
SC_User.sc_users=[];



// Exportamos la clase.
module.exports = SC_User;

//exports.X= WS_User.ws_users;

