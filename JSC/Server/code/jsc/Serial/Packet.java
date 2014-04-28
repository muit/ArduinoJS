/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc.Serial;

/**
 *
 * @author Miguel_F
 */
public class Packet {
    
    private byte main_op, id, rw;
    private int value;
	
    public Packet(byte[] ops)
    { prepare(ops[0], ops[1], ops[2], ops[3], ops[4]); }
	
    public Packet(byte main_op, byte id, byte rw, byte val1, byte val2)
    { prepare(main_op, id, rw, val1, val2); }
    
    private void prepare(byte main_op, byte id, byte rw, byte val1, byte val2)
    {
        this.main_op = main_op;
        this.id = id;
        this.rw = rw;
        value = (int)(val1)*256+(int)(val2);
    }
    
    public byte getOpCode(int entry) {
        switch(entry)
        {
            case 0:
                return main_op;
            case 1:
                return id;
            case 2:
                return rw;
            case 3:
                return (byte)(value>>8);
            case 4:
                return (byte)(value & (int)(0xFF));
            default:
                return 0x00;
        }
    }
    public int getValue()
    {
        return value;
    }
}
