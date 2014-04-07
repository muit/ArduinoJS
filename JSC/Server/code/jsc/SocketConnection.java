/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Miguel_F
 */
public class SocketConnection  extends Thread{
    private ServerSocket scs;
    private ArrayList<SocketUnit> scList;
    
    public SocketConnection(int port) throws IOException
    {
        scs = new ServerSocket(port);
        scList = new ArrayList<>();
    }
    
    @Override
    public void run()
    {
        while(true){
            try {
                scList.add(new SocketUnit(scs.accept()));
                Util.showMessage("Peticion de Conexion aceptada.");
            } catch (IOException ex) {
                Util.showError("Peticion de Conexion no se pudo aceptar.");
            }
        }
    }
    
    public void doAction(String commandMsg, Socket sc)
    {
        String args[] = commandMsg.split(" ");
        String command = args[0];
        for(int i = 0; i <= args.length; i++)
            args[i]=args[i+1];
        
        switch(command)
        {
            case "msg":
                Util.showMessage("[Client] "+commandMsg);
                break;
            case "set":
                set(args);
                break;
            case "get":
                set(args);
                break;
            default:
                //sc.sendData("err commandDontExists");
                break;
        }
    }
    //Command Scripts///////////////////////////////////////////////////////////
    private void get(String args[])
    {
        //
    }
    private String set(String args[])
    {
        switch(args[0])
        {
            case "output":
                if(Util.isNumeric(args[1]))
                {
                    if(args[2].equals("true"))
                        Main.getControl().conn.sendData("set output "+args[1]+" 1");
                    else if(args[2].equals("false"))
                        Main.getControl().conn.sendData("set output "+args[1]+" 0");
                    else
                        return "err incorrectDigitalValue";
                }
                else
                    return "err subCommandDontExists";
                break;
            case "help":
                return "msg usage: /set output *id(0-13) *state(true|false)";
            default:
                return "err subCommandDontExists";
        }
        return null;
    }
    public synchronized void update()
    {
        for(SocketUnit sc : scList)
            sc.readData();
    }
}
