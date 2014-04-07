/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jsc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 *
 * @author Miguel_F
 */
public class Util {
    public static void showError(String errorMessage){
        System.out.println("[Error] "+errorMessage);
    }
    public static void showMessage(String message){
        System.out.println("[Info] "+message);
    }
    public static void showOut(String message){
        System.out.println(message);
    }
    public static String input()
    {
        try{
	    BufferedReader bufferRead = new BufferedReader(new InputStreamReader(System.in));
	    return bufferRead.readLine();
	}
	catch(IOException e)
	{
		e.printStackTrace();
	}
        return null;
    }
    
    public static boolean isNumeric(String cadena){
        try {
            Integer.parseInt(cadena);
            return true;
        } catch (NumberFormatException nfe){
            return false;
        }
    }
    
    public static void pause(int time){
        try{
            Thread.sleep(time);
        }
        catch(InterruptedException ie){
        }
    }
}
