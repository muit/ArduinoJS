/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;

import jsc.Serial.Packet;
import gnu.io.CommPortIdentifier;
import gnu.io.PortInUseException;
import gnu.io.SerialPort;
import gnu.io.UnsupportedCommOperationException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import static jsc.Cache.serialPort;

/**
 *
 * @author Miguel_F
 */
public class Connection {
    /** Milliseconds to block while waiting for port open */
    private static final int timeOut = 3000;
    /** Default bits per second for COM port. */
    private static final int dataRate = 9600;
    
    private OutputStream output = null;
    private InputStream input = null;
    
    public Connection()
    {
        CommPortIdentifier portId = null;
        //BUCLE DE SELECCION DE SERIAL//////////////////////////////////////////
        while(true){
            Enumeration portEnum = CommPortIdentifier.getPortIdentifiers();
            CommPortIdentifier[] currPortId = new CommPortIdentifier[15];
            Util.showMessage("");
            Util.showMessage("==============================================");
            for(int i = 0; portEnum.hasMoreElements() && i<15; i++) {

                currPortId[i] = (CommPortIdentifier)portEnum.nextElement();

                Util.showMessage("= <"+i+"> '"+currPortId[i].getName()+"'");
            }
            Util.showMessage("==============================================");
            Util.showMessage("");
            Util.showMessage("Escriba el id del puerto que desee usar:");
            
            String in = Util.input();
            if(!Util.isNumeric(in))
            {
                System.out.println("Introducca numeros.");
                continue;
            }
            int s = Integer.parseInt(in);
            
            if(currPortId[s]==null)
            {
                System.out.println("Seguro que ha escrito el id bien?");
                continue;
            }
            
            System.out.println("Ha elegido "+currPortId[s].getName());
            portId = currPortId[s];
            break;
        }
        ////////////////////////////////////////////////////////////////////////
        
        
        if (portId == null) {
            Util.showError("Could not find COM port.");
            System.exit(-1);
            return;
        }

        try {
            // open serial port, and use class name for the appName.
            serialPort = (SerialPort) portId.open(this.getClass().getName(), timeOut);

            // set port parameters
            serialPort.setSerialPortParams(dataRate, SerialPort.DATABITS_8, SerialPort.STOPBITS_1, SerialPort.PARITY_NONE);

            // open the streams
            output = serialPort.getOutputStream();
            input = serialPort.getInputStream();
            
        } catch (PortInUseException e) {
            Util.showError("Ese puerto ya esta en uso.");
            Main.exit(-1);
        }
        catch(UnsupportedCommOperationException | IOException e) {
            Util.showError(e.getMessage());
            Main.exit(-1);
        }
        Util.showMessage("Arduino conectado en '"+portId.getName()+"'." );
    }
     
    public void sendData(String data){
        if(data == null)
            return;
        
        try {
            output.write(data.getBytes());
        } catch (IOException e) {
            Util.showError("There was an error while sending Data.");
            System.exit(-1);
        }
    }
    
    public Packet readData(){
        final byte[] buffer = new byte[5];
        int MESSAGE_SIZE = 5;
        int total = 0;
        int read = 0;
        try {
            while (total < MESSAGE_SIZE && (read = input.read(buffer, total, MESSAGE_SIZE - total)) >= 0)
                total += read;
            
            return new Packet(buffer);
        } catch (IOException ex) {
            Util.showError("Cant read data.");
        }
        return null;
    }
    public InputStream getInputStream() throws IOException
    {
        return serialPort.getInputStream();
    }
    public OutputStream getOutputStream() throws IOException
    {
        return serialPort.getOutputStream();
    }
}
