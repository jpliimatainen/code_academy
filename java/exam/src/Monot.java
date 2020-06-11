/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.Scanner;

public class Monot extends Kohde {
    private int koko;
    private double jaykkyys;

    public Monot() {
        this(0, 0.0, 0.0, "");
    }

    public Monot(int koko, double jaykkyys, double hinta, String kayttoPvm) {
        super(hinta, kayttoPvm);
        this.koko = koko;
        this.jaykkyys = jaykkyys;
    }

    public int getKoko() {
        return koko;
    }

    public void setKoko(int koko) {
        this.koko = koko;
    }

    public double getJaykkyys() {
        return jaykkyys;
    }

    public void setJaykkyys(double jaykkyys) {
        this.jaykkyys = jaykkyys;
    }

    @Override
    public String toString() {
        return super.toString() + ", koko: " + koko + ", jaykkyys: " + jaykkyys;
    }
    
    public void kysyTiedot() {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Anna monojen tiedot:");
        super.kysyTiedot();
        System.out.println("Anna koko");
        this.setKoko(input.nextInt());
        input.nextLine();
        System.out.println("Anna jäykkyys");
        this.setJaykkyys(input.nextDouble());
        input.nextLine();
    }
}
