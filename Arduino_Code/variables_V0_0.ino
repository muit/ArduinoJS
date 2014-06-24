/*
 Control de Variables Analógicas y Digitales
 a través de la conexión Serie.
 
 */

// VARIABLES A MONITORIZAR:
/* --------------  V. ENTRADA ANALOGICA --------------- */
const int pin_ana_in_A0 = A0;  // Analog input pin that the potentiometer is attached to
#define ID_ANA_IN_A0  'I'
int ana_in_A0 = 0;        // value read from the pot
int v_A0=0;

/* --------------  V. SALIDA ANALOGICA --------------- */
const int pin_ana_out_PW0 = 6; // Analog output pin that the LED is attached to
#define ID_ANA_OUT_PW0  'O'
int ana_out_PW0 = 0;        // value output to the PWM (analog out)
int v_PW0=0;

/* --------------  V. SALIDA DIGITAL S0 --------------- */
const int pin_dig_out_S0  =  13; // Salida digital.
#define ID_DIG_OUT_S0  'E'
int dig_out_S0 = 0;        // value read from the pot
int v_S0;
/* --------------  V. SALIDA DIGITAL S1 --------------- */
const int pin_dig_out_S1  =  12; // Salida digital.
#define ID_DIG_OUT_S1  'F'
int dig_out_S1 = 0;        // value read from the pot
int v_S1;
/* --------------  V. SALIDA DIGITAL S2 --------------- */
const int pin_dig_out_S2  =  8; // Salida digital.
#define ID_DIG_OUT_S2  'G'
int dig_out_S2 = 0;        // value read from the pot
int v_S2;
/* --------------  V. SALIDA DIGITAL S3 --------------- */
const int pin_dig_out_S3  =  7; // Salida digital.
#define ID_DIG_OUT_S3  'H'
int dig_out_S3 = 0;        // value read from the pot
int v_S3;

/* --------------  V. ENTRADA DIGITAL --------------- */
const int pin_dig_in_D0  = 2 ;  // Entrada digital
#define ID_DIG_IN_D0  'A'
int dig_in_D0 = 0;        // value read from the pot
int v_D0;
/* --------------  V. ENTRADA DIGITAL --------------- */
const int pin_dig_in_D1  = 3 ;  // Entrada digital
#define ID_DIG_IN_D1  'B'
int dig_in_D1 = 0;        // value read from the pot
int v_D1;
/* --------------  V. ENTRADA DIGITAL --------------- */
const int pin_dig_in_D2  = 4 ;  // Entrada digital
#define ID_DIG_IN_D2  'C'
int dig_in_D2 = 0;        // value read from the pot
int v_D2;
/* --------------  V. ENTRADA DIGITAL --------------- */
const int pin_dig_in_D3  = 5 ;  // Entrada digital
#define ID_DIG_IN_D3  'D'
int dig_in_D3 = 0;        // value read from the pot
int v_D3;


// Inicialización del hardware a usar, conexión Serie, etc
void setup() {
  // Definicion de Entradas digitales:
  pinMode(pin_dig_in_D0,INPUT);
  pinMode(pin_dig_in_D1,INPUT);
  pinMode(pin_dig_in_D2,INPUT_PULLUP);
  pinMode(pin_dig_in_D3,INPUT_PULLUP);
  //DEfinicion Salidas Digitales
  pinMode(pin_dig_out_S0,OUTPUT);
  pinMode(pin_dig_out_S1,OUTPUT);
  pinMode(pin_dig_out_S2,OUTPUT);
  pinMode(pin_dig_out_S3,OUTPUT);
  
  // initialize serial communications at 9600 bps:
  Serial.begin(9600); 
}

// comando de 5 bytes binario. [FF][id_var][op_var][value_hi][value_lo]
// Test con caracteres ascii [F][A-Z][R/W][VH][VL]
// retorno de comando. (0=OK 1=OK_FIN -1=ERR_COM)
#define ARD_OK		0
#define ARD_FIN		1
#define ARD_ERR		-1

int ret_com=ARD_OK;
int err_code=ARD_OK; /* codigos de error...*/
#define ERR_BAD_VAR      -10;

/* --------- COMANDO ---------------*/
#define SZ_COMMAND	5
char buffer_com[SZ_COMMAND];

char b_resp[SZ_COMMAND]; // Buffer para respuesta del micro.
/* ---------------------------------*/

int entero_de(char hi,char lo) {
int value=0;
if (lo>'9') value=lo-'7';
else value=lo-'0';
if (hi>'9') value+=(hi-'7')*16;
else value+=(hi-'0')*16;
return value;
}

char v_low(int a) {
  char v=(char)(a&0xF)+'0';
  if (v>'9') v+=7;
  return v;
}
char v_high(int a) {
  char v=((char)((a&0xFF)>>4)+'0');
  if (v>'9') v+=7;
  return v;
}

/* Envia variable que ha cambiado de estado.*/
void Envia_Respuesta(char id,int value){
  char v;
  b_resp[0]='F';
  b_resp[1]=id;
  b_resp[2]='R';
  // Valor alto
  b_resp[3]=v_high(value);
  //Valor bajo
  b_resp[4]=v_low(value);
  Serial.write((const uint8_t*)b_resp,5);
  Serial.print(";\n");
}


int cnt_byte=0;
/* Funcion de recepción de comandos*/
int LeeComando() {
int ret=ARD_OK;
while (Serial.available()>0) {
  //Serial.print(cnt_byte,DEC);
  buffer_com[cnt_byte++]=(char)Serial.read();
  if (cnt_byte==SZ_COMMAND) {
      cnt_byte=0;
      ret=Ejecuta_Comando();
      break;
  }
}
return ret;
}
/* Funcion de atencion de comandos */
int Ejecuta_Comando() {
  int ret=ARD_OK;
  //Serial.write((const uint8_t*)buffer_com,5);
 // primer byte 'F'
  if (buffer_com[0]!='F') {
    Serial.print("Inicio no valido, esperado F\n");
  } else {
    // Identificacion de variable
    switch (buffer_com[1]) {
      case ID_DIG_OUT_S0:
            if (buffer_com[2]=='W') {v_S0=buffer_com[4]-'0';digitalWrite(pin_dig_out_S0,v_S0);}
            else Envia_Respuesta(ID_DIG_OUT_S0,v_S0);
      break;
      case ID_DIG_OUT_S1:
            if (buffer_com[2]=='W') {v_S1=buffer_com[4]-'0';digitalWrite(pin_dig_out_S1,v_S1);}
            else Envia_Respuesta(ID_DIG_OUT_S1,v_S1);
      break;
      case ID_DIG_OUT_S2:
            if (buffer_com[2]=='W') {v_S2=buffer_com[4]-'0';digitalWrite(pin_dig_out_S2,v_S2);}
            else Envia_Respuesta(ID_DIG_OUT_S2,v_S2);
      break;
      case ID_DIG_OUT_S3:
            if (buffer_com[2]=='W') {v_S3=buffer_com[4]-'0';digitalWrite(pin_dig_out_S3,v_S3);}
            else Envia_Respuesta(ID_DIG_OUT_S3,v_S3);
      break;
      case ID_ANA_IN_A0:
          //Variable de solo lectura, enviar el ultimo valor capturado
          Envia_Respuesta(ID_ANA_IN_A0,v_A0);
      break;
      case ID_ANA_OUT_PW0:
          // lee o Escribe;
          if (buffer_com[2]=='W') {
              // change the analog out value:
              v_PW0=(int)entero_de(buffer_com[3],buffer_com[4]);
              analogWrite(pin_ana_out_PW0, v_PW0); 
              //Serial.print("OK");
          } else {
            Envia_Respuesta(ID_ANA_OUT_PW0,v_PW0);
          }
      break;
      default:
      Serial.print("Error comando desconocido \n");
      err_code=ERR_BAD_VAR;
      ret=ARD_ERR;
    }
  }
  return ret;
}

int a=0;
int b=0;

void loop() {
// **1: RECEPCION Y ATENCION DE COMANDOS *****
ret_com= LeeComando();
// control de errores;
switch (ret_com) {
  case ARD_OK:
    break;
  case ARD_FIN:
    // La recepción y ejecucion de comando terminó OK!
    break;
  case ARD_ERR:
    // Error en la recepcion o ejecucion de un comando.
    break;
}
// ********************* FIN RECEPCION Y ATENCION DE COMANDOS   ************

// **2: LECTURA DE LAS VARIABLES A MONITORIZAR ****

a=(int)(millis()>>8); // para leer 250ms el puerto analogico

if (a!=b) {
  ana_in_A0=(analogRead(pin_ana_in_A0)>>2);
  b=a;
  //Envia_Respuesta(ID_SENSOR_VALUE, tmp_sensorValue);
  v_PW0=ana_in_A0;
}

// ENTRADAS DIGITALES:
v_D0=digitalRead(pin_dig_in_D0);
if (v_D0!=dig_in_D0) Envia_Respuesta(ID_DIG_IN_D0,v_D0);
dig_in_D0=v_D0;
v_D1=digitalRead(pin_dig_in_D1);
if (v_D1!=dig_in_D1) Envia_Respuesta(ID_DIG_IN_D1,v_D1);
dig_in_D1=v_D1;


v_D2=digitalRead(pin_dig_in_D2);
if (v_D2!=dig_in_D2) Envia_Respuesta(ID_DIG_IN_D2,v_D2);
dig_in_D2=v_D2;
v_D3=digitalRead(pin_dig_in_D3);
if (v_D3!=dig_in_D3) Envia_Respuesta(ID_DIG_IN_D3,v_D3);
dig_in_D3=v_D3;


// ********************* FIN LECTURA DE LAS VARIABLES A MONITORIZAR ************** 


// **3: COMPROBACION DE CAMBIO DE VARIABLES MONITORIZADAS, ENVIO AL PC SI HAY CAMBIO.
// ANALOGICAS:
if (ana_in_A0!=v_A0) {
  v_A0=ana_in_A0;
  // Envio de la variable.
  Envia_Respuesta(ID_ANA_IN_A0,v_A0);
}

// DIGITALES SALIDA PWM:

if (ana_out_PW0!=v_PW0) {
  ana_out_PW0=v_PW0;
  // Envio de la variable.
  analogWrite(pin_ana_out_PW0, v_PW0);
  Envia_Respuesta(ID_ANA_OUT_PW0,v_PW0);
}

//DIGITALES SALIDAS BINARIAS;
if (v_S0!=dig_out_S0) Envia_Respuesta(ID_DIG_OUT_S0,v_S0);
dig_out_S0=v_S0;
if (v_S1!=dig_out_S1) Envia_Respuesta(ID_DIG_OUT_S1,v_S1);
dig_out_S1=v_S1;
if (v_S2!=dig_out_S2) Envia_Respuesta(ID_DIG_OUT_S2,v_S2);
dig_out_S2=v_S2;
if (v_S3!=dig_out_S3) Envia_Respuesta(ID_DIG_OUT_S3,v_S3);
dig_out_S3=v_S3;


// ********************* FIN COMPROBACION DE CAMBIO ***************************                   
            
}
