String inputString = "";
boolean stringComplete = false;

void setup() {
  Serial.begin(9600);
  inputString.reserve(200);
}

void loop() {
  if (stringComplete) 
  {
    doAction(inputString);
    inputString = "";
    stringComplete = false;
  }
}

void doAction(String msg)
{
  String args[] = msg.split(" ");
}

void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    inputString += inChar;
    
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
