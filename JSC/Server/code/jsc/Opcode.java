

/**
 *
 * @author Miguel_F
 */
public enum Opcode
{
    OP_MAIN_DEFAULT(0xFF),
    
	OP_READ(0x00),
	OP_WRITE(0x01),
	
    OP_ID_DIGITAL_0(0x00),
    OP_ID_DIGITAL_1(0x01),
    OP_ID_DIGITAL_2(0x02),
    OP_ID_DIGITAL_3(0x03),
    OP_ID_DIGITAL_4(0x04),
    OP_ID_DIGITAL_5(0x05),
    OP_ID_DIGITAL_6(0x06),
    OP_ID_DIGITAL_7(0x07),
    OP_ID_DIGITAL_8(0x08),
    OP_ID_DIGITAL_9(0x09),
    OP_ID_DIGITAL_10(0x0A),
    OP_ID_DIGITAL_11(0x0B),
    OP_ID_DIGITAL_12(0x0C),
    OP_ID_DIGITAL_13(0x0D),
    OP_ID_ANALOG_0(0x0E),
    OP_ID_ANALOG_1(0x0F),
    OP_ID_ANALOG_2(0x10),
    OP_ID_ANALOG_3(0x11),
    OP_ID_ANALOG_4(0x12),
    OP_ID_ANALOG_5(0x13);

	private final int OPS_SIZE = 5;
	
    private final byte[] ops = new byte[OPS_SIZE];
	private final int main_op, id, rw;
	private final int value;
	
    private Opcode(byte[] ops)
    {
        this.ops = ops;
		Opcodes(ops[0], ops[1], ops[2], ops[3], ops[4]);
    }
	
	private Opcode(byte main_op, byte id, byte rw, byte val1, byte val2)
    {
		this.main_op = (int)main_op;
		this.id = (int)id;
		this.rw = (int)rw;
        value = (int)(val1)*256+(int)(val2)
    }
	
    public byte getOpCode(int entry) {
        switch(entry)
		{
			case 0:
				return (byte)main_op;
			case 1:
				return (byte)id;
			case 2:
				return (byte)rw;
			case 3:
				return (byte)(value>>8);
			case 4:
				return (byte)(value & (int)(0xFF));
			default:
				return null;
		}
    }
}
