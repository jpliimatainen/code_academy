/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 5
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class TuoteGenelec implements ITuote {

    public TuoteGenelec() {
    }

    @Override
    public ArrayList<Tuote> getTuoteTiedot() {
        ArrayList<Tuote> tuotteet = new ArrayList<>();
        tuotteet.add(new Tuote("lorem ipsum 21", 300, false, "Genelec1", "123"));
        tuotteet.add(new Tuote("orem ipsum 23e", 140.50, false, "Genelec2", "246"));
        tuotteet.add(new Tuote("orem ipsum 21adsf", 100.50, true, "Genelec3", "678"));
        
        return tuotteet;
    }
}
