/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.Scanner;

public class Sukset extends Kohde {
    private int pituus;
    private String merkki;

    public Sukset() {
        this(0, "", 0.0, "");
    }

    public Sukset(int pituus, String merkki, double hinta, String kayttoPvm) {
        super(hinta, kayttoPvm);
        this.pituus = pituus;
        this.merkki = merkki;
    }

    public int getPituus() {
        return pituus;
    }

    public void setPituus(int pituus) {
        this.pituus = pituus;
    }

    public String getMerkki() {
        return merkki;
    }

    public void setMerkki(String merkki) {
        this.merkki = merkki;
    }

    @Override
    public String toString() {
        return super.toString() + ", pituus: " + pituus + ", merkki: " + merkki;
    }
    
    public void kysyTiedot() {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Anna suksien tiedot:");
        super.kysyTiedot();
        System.out.println("Anna pituus");
        this.setPituus(input.nextInt());
        input.nextLine();
        System.out.println("Anna merkki");
        this.setMerkki(input.nextLine());
    }
}
