/* 
 * Tehtävä 2
 *
 * @author Juha-Pekka Liimatainen 31.10.2019
 *
 */
package diamond;

import java.util.Scanner;

public class DiamondClient2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        PrintDiamond2 pd = new PrintDiamond2(7, '*');
        Thread thread;
        Scanner input = new Scanner(System.in);
        int numOfThreads = 0;
        
        System.out.println("Kuinka monta säiettä käynnistetään?");
        numOfThreads = input.nextInt();
        
        for (int i = 0; i < numOfThreads; i++) {
            thread = new Thread(pd);
            thread.start();
        }
    }
}
