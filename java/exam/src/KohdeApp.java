/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

public class KohdeApp {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Paketti paketti  = new Paketti();
        
        System.out.println("paketin tiedot:");
        System.out.println(paketti.toString());
        paketti.tulostaHinta();
    }
    
}
