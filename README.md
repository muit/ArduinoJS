=========
ArduinoJS
=========

Aplicación de chat y control de arduino basado en comandos.

====================
USO:
Para iniciar el servidor se debe abrir el ejecutable correspondiente a su sistema operativo.

Si no se quiere hacer uso de arduino el servidor dispone de una opción llamada arduinoEnabled,
para editarla sustituir al principio del codigo "Server/Server.js" en la linea 7:

arduinoEnabled: true,

por 

arduinoEnabled: false,


Dentro del chat para iniciar la escucha personal de arduino enviar el mensaje:

"/arduino read on"

si se quiere detener la escucha:

"/arduino read off"

Para enviar un comando a arduino:

"/arduino write *comando* " //Omita los *


Existen comandos adicionales para la gestion del chat.
Estos requieren de contraseña de administrador.
Para escojer la contraseña que desee edite el codigo "Server/Server.js" cambiando en la linea 6:

adminPass: "password1234",

por 

adminPass: "*contraseña*"; //Omita los *

=====================
Codigo Libre:

Este proyecto usa licencia GNU GPL por la cual garantiza 
a los usuarios finales (personas, organizaciones, compañías) la libertad de 
usar, estudiar, compartir (copiar) y modificar el software.

=====================
Código por:

Muit Fos - Chat, Web y Servidor.

Marcos Hidalgo Gonzalez - Código Arduino.

=====================
