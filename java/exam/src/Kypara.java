/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.Scanner;

public class Kypara extends Kohde {
    private int koko;
    private String vari;

    public Kypara() {
        this(0, "", 0.0, "");
    }

    public Kypara(int koko, String vari, double hinta, String kayttoPvm) {
        super(hinta, kayttoPvm);
        this.koko = koko;
        this.vari = vari;
    }

    public int getKoko() {
        return koko;
    }

    public void setKoko(int koko) {
        this.koko = koko;
    }

    public String getVari() {
        return vari;
    }

    public void setVari(String vari) {
        this.vari = vari;
    }

    @Override
    public String toString() {
        return super.toString() + ", koko: " + koko + ", vari: " + vari;
    }
    
    public void kysyTiedot() {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Anna kypärän tiedot:");
        super.kysyTiedot();
        System.out.println("Anna koko");
        this.setKoko(input.nextInt());
        input.nextLine();
        System.out.println("Anna väri");
        this.setVari(input.nextLine());
    }
}
