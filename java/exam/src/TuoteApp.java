/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 5
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class TuoteApp {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        TuoteCanon canon = new TuoteCanon();
        ArrayList<Tuote> canonit = canon.getTuoteTiedot();
        
        System.out.println("Canon tuotteet: ");
        for (Tuote t : canonit) {
            t.tulostaTuotteenTiedot();
        }
        
        TuoteGenelec genelec = new TuoteGenelec();
        ArrayList<Tuote> genelecit = genelec.getTuoteTiedot();
        
        System.out.println("\nGenelec tuotteet: ");
        for (Tuote t : genelecit) {
            t.tulostaTuotteenTiedot();
        }
    }
    
}
