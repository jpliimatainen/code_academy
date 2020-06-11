/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.Scanner;

public class Kohde {
    private double hinta;
    private String kayttoPvm;

    public Kohde() {
        this(0.0, "");
    }
    
    public Kohde(double hinta, String kayttoPvm) {
        this.hinta = hinta;
        this.kayttoPvm = kayttoPvm;
    }

    public double getHinta() {
        return hinta;
    }

    public void setHinta(double hinta) {
        this.hinta = hinta;
    }

    public String getKayttoPvm() {
        return kayttoPvm;
    }

    public void setKayttoPvm(String kayttoPvm) {
        this.kayttoPvm = kayttoPvm;
    }

    @Override
    public String toString() {
        return "hinta: " + hinta + ", kayttoPvm: " + kayttoPvm;
    }
    
    public void kysyTiedot() {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Anna hinta / pv");
        this.setHinta(input.nextDouble());
        input.nextLine();
        System.out.println("Anna käyttöönottopäivä");
        this.setKayttoPvm(input.nextLine());
    }
}
