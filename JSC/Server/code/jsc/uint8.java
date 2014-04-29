/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;


/**
 *
 * @author Miguel_F
 */
public class uint8 {
	private int value
	public uint8(byte value)
	{
			this.value = value & oxFF;
	}

	public int getInt()
	{
		return value;	
	}
}
