/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 5
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class TuoteCanon implements ITuote {

    public TuoteCanon() {
    }
    

    @Override
    public ArrayList<Tuote> getTuoteTiedot() {
        ArrayList<Tuote> tuotteet = new ArrayList<>();
        tuotteet.add(new Tuote("kuvausteksti1", 100.50, true, "Canon1", "123"));
        tuotteet.add(new Tuote("kuvausteksti2", 3200, false, "Canon2", "246"));
        tuotteet.add(new Tuote("kuvausteksti3", 200.50, false, "Canon3", "678"));
        
        return tuotteet;
    }
}
