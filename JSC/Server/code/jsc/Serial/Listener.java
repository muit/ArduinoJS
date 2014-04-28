/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc.Serial;

import jsc.Connection;
import jsc.Util;

/**
 *
 * @author Miguel_F
 */
public class Listener extends Thread
{
    private final Connection conn;
    public Listener(Connection conn)
    {
        this.conn = conn;
    }
    @Override
    public void run()
    {
        while(true){
            update();
        }
    }
    
    public void update()
    {
        //INPUTDATA/////////////////////////////////////////////////////////////
        Packet inputPacket = conn.readData();
        if(inputPacket != null)
        {
            Util.showMessage("Packet: '"+inputPacket.getOpCode(0)+" "+inputPacket.getOpCode(1)+" "+inputPacket.getOpCode(2)+" "+inputPacket.getOpCode(3)+" "+inputPacket.getOpCode(4)+"'");
        }
    }
}
