/* 
 * Tehtävä 1
 *
 * @author Juha-Pekka Liimatainen 30.10.2019
 *
 */
package diamond;

import java.util.Scanner;

public class DiamondClient {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Runnable pd = new PrintDiamond(7, '*');
        Thread thread;
        Scanner input = new Scanner(System.in);
        int numOfThreads;
        
        System.out.println("Kuinka monta säiettä käynnistetään?");
        numOfThreads = input.nextInt();
        
        for (int i = 0; i < numOfThreads; i++) {
            thread = new Thread(pd);
            thread.start();
        }
    }
}
