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
public class Main {

    private static Control control;
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        control = new Control();
    }
    
    public static Control getControl(){ return control; }
    public static void exit(int status){ System.exit(status);}
}
