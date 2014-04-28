package jsc.Serial;



/**
 *
 * @author Miguel_F
 */
public enum Opcode
{
    OP_MAIN_DEFAULT ((byte) 0xFF),
    
    OP_READ         ((byte) 0x00),
    OP_WRITE        ((byte) 0x01),
    
    OP_ID_DIGITAL_0 ((byte) 0x00),
    OP_ID_DIGITAL_1 ((byte) 0x01),
    OP_ID_DIGITAL_2 ((byte) 0x02),
    OP_ID_DIGITAL_3 ((byte) 0x03),
    OP_ID_DIGITAL_4 ((byte) 0x04),
    OP_ID_DIGITAL_5 ((byte) 0x05),
    OP_ID_DIGITAL_6 ((byte) 0x06),
    OP_ID_DIGITAL_7 ((byte) 0x07),
    OP_ID_DIGITAL_8 ((byte) 0x08),
    OP_ID_DIGITAL_9 ((byte) 0x09),
    OP_ID_DIGITAL_10((byte) 0x0A),
    OP_ID_DIGITAL_11((byte) 0x0B),
    OP_ID_DIGITAL_12((byte) 0x0C),
    OP_ID_DIGITAL_13((byte) 0x0D),
    OP_ID_ANALOG_0  ((byte) 0x0E),
    OP_ID_ANALOG_1  ((byte) 0x0F),
    OP_ID_ANALOG_2  ((byte) 0x10),
    OP_ID_ANALOG_3  ((byte) 0x11),
    OP_ID_ANALOG_4  ((byte) 0x12),
    OP_ID_ANALOG_5  ((byte) 0x13);

    private final byte op;
    
    private Opcode(byte op)
    {
        this.op = op;
    }
    public byte getOp()
    {
        return op;
    }
}
