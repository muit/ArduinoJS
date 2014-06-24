/**
 * @author Marcos Hidalgo
 * 
 * Servidor Arduino con Web Sockets.
 * 
 */
var WS_User = require('./arduino_users.js');
//var wsu_list=WS_User.get_list();


var PORT = 1967;
var users = 0;
var id_user = 0;

var MAX_USERS=16;

// Constantes del modulo:
var PR_INICIO = 0; // esperando caracter de inicio.
var PR_DATA = 1;
var SZ_JDS_COM = 256;

var WebSocketServer = require('ws').Server, wss = new WebSocketServer({
	port : PORT
});



// FUNCIONES DE PUERTO SERIE :
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

serialport.on('error', function(err) {
	console.log(err);
});

serialport.on('open', function(err) {
	console.log('callback OPEN!!!');
});

var sp_arduino = null;
var portName=null;

function listar_Puertos() {
	serialport.list(function(err, ports) {
		var n = 1;
		console.log(ports);
		/*
		ports.forEach(function(port) {
			console.log('Puerto: ' + (n++));
			console.log(' Ruta: ' + port.comName);
			console.log(' Id: ' + port.pnpId);
			console.log(' manufacture: ' + port.manufacturer);
		});*/
	});
}


//PARSER:
var cnt_byte=0; // contador de bytes en el buffer de comando
var buff_com = new Array(16); // array para recoger comando.
var SZ_COMMAND=5;

/** parsebin_to_ARD(data)
 *  Analiza array de bytes y si es correcto lo 
 *  envia al arduino.
 * 
 * */
function parsebin_to_ARD(data){
	return;
}

/** 
 * parse_str_to_ARD(data)
 * 
 * Parseo de string recibido por websocket,
 * si encaja comando ardunino se envia.
 * */
var cnt_ch=0; // contador de chars en el string de comando
var str_com = ""; // string para recoger comando.

function parse_str_to_ARD(data) {
	var c;
	// consumo de los datos recibidos:
	for (var i = 0; i < data.length; i++) {
		c = data.charAt(i);
		if (cnt_ch === 0 && (c !== 'F') ) {
			console.log('ig: '+ c);
			continue; // ignorar el byte
		}
		str_com += c;
		cnt_ch++;
		console.log('almacenando: '+ c);
		if (cnt_ch === SZ_COMMAND) {
			cnt_ch = 0;
			// ejecuta comando:		
			var v = str_com.slice();
			str_com="";
			// Enviar al arduino.
			sp_arduino.write(v);
			console.log('al Arduino...: ' + v);
			break;
		}
	}
	return;
}



/** parser_from_ARD()  
 * 
 * recibe los caracteres del puerto serie, cuado recibe un comando
 * completo lo ejecuta.
 * 
 */

function parser_from_ARD(data) {
	var c, ret;
	// consumo de los datos recibidos:
	for (var i = 0; i < data.length; i++) {
		c = data[i];
		if (cnt_byte === 0 && c !== "F".charCodeAt(0)) {
			// console.log('Ig.'+c);
			continue; // ignorar el byte
		}
		buff_com[cnt_byte++] = c;
		// console.log('almacenando: '+ c);
		if (cnt_byte === SZ_COMMAND) {
			cnt_byte = 0;
			// ejecuta comando:
			var v = buff_com.slice();
			v.length = SZ_COMMAND;
			sp_arduino.emit('exec_com_ARD', v);
			console.log('mandando: ' + v);
			break;
		}
	}
	return;
}

/** ejecuta_ARD(v)
 * v: array buffer del comando recibido.
 * 
 * */
function ejecuta_ARD(v) {
	// Identifica variable,
	// recupera valor y lo envia a los usuarios 
	// conectados que correspondan. 
	// TODO: 
	// Se lo mandamos a todos los usuarios conectados.
	
	console.log('recibido comando: '+ v);
	// acceso a usuarios conectados:
	console.log('usuarios '+ WS_User.ws_user);
	for (var a in WS_User.ws_user) {
		if (a!==null) { a.ws.send('eres id='+ a.id);}
	}
}

/* * conectar_arduino()
 * 
 * Conecta con el arduino en el puerto serie.
 * Establece las funciones para eventos...
 * */

function conectar_arduino() {
	serialport.list(function(err, ports) {
		if (ports.length !== 0) {
			portName = ports[0].comName;
			console.log('usando puerto: ' + portName);
			// ------
			sp_arduino = new SerialPort(portName, {
				baudRate : 9600,
				dataBits : 8,
				parity : 'none',
				stopBits : 1
			});

			sp_arduino.on('open', function(err) {
				console.log('abriendo puerto : ' + portName);
			});

			sp_arduino.on('data', parser_from_ARD);
			sp_arduino.on('exec_com_ARD', ejecuta_ARD);

			/*
			 * sp_arduino.open(function(err){ console.log('ss: '+ portName); });
			 */

		} else {
			console.log('Conecte el arduino, por favor!');
		}
	});
}


// / ---------------------------


// Acciones tras el arranque....
console.log('Conectado y listo!!!');
// Puertos disponibles:
console.log('Puertos disponibles...');
listar_Puertos();
conectar_arduino();

// Eventos a tratar...



wss.on('connection', function(ws) {
	var wsu=new WS_User('Juan',ws);
	var a;
	users++;
	ws.user = id_user++;
	ws.bytearray = new Uint8Array(256);
	// añadir ws de usuario al array.

	// Vars de estado del parseo del mensaje.
	ws.st_parse = PR_INICIO;
	ws.index = PR_INICIO;

	a = 'conectado en puerto: {0}  users: {1} id_user={2}'.format(PORT
			.toString(), users.toString(), ws.user.toString());
	console.log(a);
	ws.on('message', function(data, flags) {
		if (flags.binary) {
			console.log('bin [%d]: %d, len=%d', ws.user, data[0], data.length);
			// Tratamiento de la cadena recibida...
			parsebin_to_ARD(data);
		} else {
			console.log('cadena [%d](%d): %s', ws.user, data.length, data);
			// Enviarlo al arduino!!
			if (sp_arduino !== null) {
				// Decide donde enviar la cadena. consola o arduino.
				parse_str_to_ARD(data);
				//console.log('enviando...' + data);
				//sp_arduino.write(data);
			}

		}
		/*
		 * if (message[index]=='#') { ws.bytearray[ws.index]=message[index]; }
		 */

		// Si el char='#' mensaje binario..
		// Entregamos de uno en uno a Parse_JDS,
		// si retorna 0 seguimos entregando
		// si =1 empezamos proceso.
		// si <1 error. empezamos proceso.
	});
	ws.on('close', function(message) {
		users--;
		console.log('cerrando: %d', users);
		wsu.sale();
	});
	ws.send(a);
});

wss.on('close', function(ws) {
	console.log('Desconectado!');
});

// Añadir a la clase String una funcion para formatear...
// Uso: str.format('kjhd {0}',arg0,arg1,...);
String.prototype.format = function() {
	var formatted = this;
	for ( var arg in arguments) {
		formatted = formatted.replace("{" + arg + "}", arguments[arg]);
	}
	return formatted;
};




