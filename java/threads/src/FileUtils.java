/* 
 * Tehtävä 3
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */
package fileio;

import java.io.FileReader;
import java.io.IOException;

public class FileUtils {
    public static final int MAX_SIZE = 1000; // maximum number of characters to be read
    
    public static String ReadFromFile(String file) {
        FileReader fr = null;
        char[] buffer = new char[MAX_SIZE];
        
        try {
            fr = new FileReader(file);
            fr.read(buffer, 0, MAX_SIZE);
        }
        catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            if (fr != null) {
                try {
                    fr.close();
                } catch (IOException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
        
        return String.valueOf(buffer);
    }
    
    public static Thread WriteToFile(String file, String input) {
        Runnable bgWriter = new BackgroundWriter(file, input);
        Thread bgThread = new Thread(bgWriter);
        bgThread.start();
        
        // return the thread to the caller
        return bgThread;
    }
    
}
