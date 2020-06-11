/* 
 * Tehtävä 3
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */
package fileio;

import java.io.FileWriter;
import java.io.IOException;

public class BackgroundWriter implements Runnable {
    private String file;
    private String text;

    public BackgroundWriter(String file, String text) {
        this.file = file;
        this.text = text;
    }

    @Override
    public void run() {
        FileWriter fw = null;
        int i, len = text.length();
        
        try {
            fw = new FileWriter(file);
            for (i = 0; i < len; i += 10) {
                if (len - i < 10) { // less than 10 chars left
                    fw.write(text, i, (len - i));
                }
                else {
                    fw.write(text, i, 10);
                }
                Thread.sleep(20); // sleep for 20 milliseconds
            }
            
            fw.close();
        }
        catch (IOException ex) {
            System.out.println(ex.getMessage());
        } catch (InterruptedException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            if (fw != null) {
                try {
                    fw.close();
                } catch (IOException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
    }
}