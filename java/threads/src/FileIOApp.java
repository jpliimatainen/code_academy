/* 
 * Tehtävä 3
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */
package fileio;

import java.util.Scanner;

public class FileIOApp extends Thread {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String file, fileName, inputText;
        Thread bgThread, readThread;
        
        System.out.println("Anna tiedoston nimi");
        fileName = input.nextLine();
        System.out.println("Anna teksti");
        inputText = input.nextLine();
        
        file = "C:\\temp\\" + fileName;
        
        bgThread = FileUtils.WriteToFile(file, inputText);
        
        while(bgThread.isAlive()) {
            try {
                // wait untill the writing thread has finished
                Thread.sleep(200);
                System.out.println("Waiting for the writing operation to be completed...");
            } catch (InterruptedException ex) {
                System.out.println(ex.getMessage());
            }
        }
        System.out.println("Writing to the file completed");
        
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("Content of the file:");
                System.out.println(FileUtils.ReadFromFile(file));
            }
            
        };
        
        readThread = new Thread(r);
        readThread.start();
    }
}
