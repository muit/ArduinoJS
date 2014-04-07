/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;

import java.io.IOException;

/**
 *
 * @author Miguel_F
 */
public class Control {
    private boolean done = true;
    public Connection conn;
    public SocketConnection SC;
    public Control()
    {
        Util.showMessage("===============");
        Util.showMessage("=Iniciando JSC=");
        Util.showMessage("===============");
        conn = new Connection();
        
        //BUCLE DE SELECCION DE PUERTO//////////////////////////////////////////
        while(true)
        {
            Util.showMessage("");
            Util.showMessage("Escriba el puerto de escucha:");
            String in = Util.input();
            if(!Util.isNumeric(in))
            {
                System.out.println("Introducca numeros.");
                continue;
            }
            int port = Integer.parseInt(in);
            try
            {
                SC = new SocketConnection(port);
                SC.start();
            }
            catch(IOException e)
            {
                Util.showError("No se puso poner "+port+" en escucha.");
                continue;
            }
            Util.showMessage("Server en escucha en el puerto '"+port+"'.");
            break;
        }
        ////////////////////////////////////////////////////////////////////////
        
        Util.showMessage("Conectado.");
        
        while(done)
        {
            SC.update();
            Util.showOut("Ping.");
            conn.sendData("1");
            Util.pause(1000);
            Util.showOut("Pong.");
            conn.sendData("0");
            Util.pause(1000);
        }
        Main.exit(0);
    }
    
    public void update()
    {
        
        //INPUTDATA/////////////////////////////////////////////////////////////
        String inputString = conn.readData();
        if(inputString != null)
        {
            if(inputString.charAt(0)=='/')
                doAction(inputString.substring(1, inputString.length()));
            else
                Util.showMessage("[Arduino]: "+inputString);
        }
        
        
    }
    
    public void doAction(String commandMsg)
    {
        String args[] = commandMsg.split(" ");
        String command = args[0];
        for(int i = 0; i <= args.length; i++)
            args[i]=args[i+1];
        
        switch(command)
        {
            case "ping":
                ping();
                break;
            case "pong":
                Util.showMessage("[Arduino]: pong");
                break;
            case "set":
                updateValue(args);
                break;
            default:
                conn.sendData("err commandDontExists");
                break;
        }
    }
    
    //Command Scripts///////////////////////////////////////////////////////////
    private void ping()
    {
        conn.sendData("pong");
    }
    private String updateValue(String args[])
    {
        switch(args[0])
        {
            case "digital":
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
            case "analog":
                if(Util.isNumeric(args[1]))
                {
                    if(Integer.parseInt(args[1])>=0 && Integer.parseInt(args[1]) < 1024)
                        Main.getControl().conn.sendData("set output "+args[1]+" "+args[1]);
                    else
                        return "err incorrectAnalogValue";
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
}
