/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.Scanner;

public class Sauvat extends Kohde {
    private int pituus;

    public Sauvat() {
        this(0, 0.0, "");
    }

    public Sauvat(int pituus, double hinta, String kayttoPvm) {
        super(hinta, kayttoPvm);
        this.pituus = pituus;
    }

    public int getPituus() {
        return pituus;
    }

    public void setPituus(int pituus) {
        this.pituus = pituus;
    }

    @Override
    public String toString() {
        return super.toString() + ", pituus: " + pituus;
    }
    
     public void kysyTiedot() {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Anna sauvojen tiedot:");
        super.kysyTiedot();
        System.out.println("Anna pituus");
        this.setPituus(input.nextInt());
        input.nextLine();
    }
}
