/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 *
 * @author Miguel_F
 */
public class SocketUnit {
    private final Socket sc;
    private final Scanner input;
    private final PrintWriter output;
    
    public SocketUnit(Socket sc) throws IOException
    {
        this.sc = sc;
        input = new Scanner(sc.getInputStream());
        output = new PrintWriter(sc.getOutputStream(), true);
    }
    
    public void readData()
    {
        while(input.hasNextLine())
        {
            String data = input.nextLine();
            if (data.length() == 0)
                break;
            
            System.out.println("[Client] "+data);
            switch(data)
            {
                case "ping":
                    sendData("pong");
                    break;
                default:
                    System.out.println("Data desconocida.");
                    break;
            }
        }
    }
    
    public void sendData(String data)
    {
        System.out.println("[Server] "+data);
        output.println(data);
    }
}
