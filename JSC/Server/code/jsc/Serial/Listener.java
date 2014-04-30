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
	
		Util.showMessage("Started listening serial.");
        while(true){
            if(!update())
				break;
        }
		Util.showMessage("Stoped listening serial.");
    }
    
    public boolean update()
    {
        //INPUTDATA/////////////////////////////////////////////////////////////
        Packet inputPacket = conn.readData();
        if(inputPacket != null)
        {
			if(inputPacket.getOpCode(0) == Opcode.OP_MAIN_DEFAULT.getOp())
				if(inputPacket.getOpCode(2) == Opcode.OP_WRITE.getOp())
					Util.showMessage("Packet: 'Write in "+(int)inputPacket.getOpCode(1)+" : "+inputPacket.getValue()+"'");
				else
					Util.showMessage("Packet: 'Read from "+(int)inputPacket.getOpCode(1)+"'");
			else   
				Util.showMessage("Unknown Packet: '"+(int)inputPacket.getOpCode(0)+" "+(int)inputPacket.getOpCode(1)+" "+(int)inputPacket.getOpCode(2)+" "+inputPacket.getValue()+"'"); 
			return true;
		}
		return false;
    }
}
