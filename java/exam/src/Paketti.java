/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 4
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

public class Paketti {
    private Sukset sukset;
    private Monot monot;
    private Sauvat sauvat;
    private Kypara kypara;

    public Paketti() {
        this.sukset = new Sukset();
        this.sukset.kysyTiedot();
        this.monot = new Monot();
        this.monot.kysyTiedot();
        this.sauvat = new Sauvat();
        this.sauvat.kysyTiedot();
        this.kypara = new Kypara();
        this.kypara.kysyTiedot();
    }

    @Override
    public String toString() {
        return "Paketti:\nSukset:\n" + sukset.toString() + "\nMonot:\n" 
            + monot.toString() + "\nSauvat:\n" + sauvat.toString() 
            + "\nKypärä:\n" + kypara.toString();
    }
    
    public void tulostaHinta() {
        double hinta = 0.0;
        
        hinta += this.sukset.getHinta();
        hinta += this.monot.getHinta();
        hinta += this.sauvat.getHinta();
        hinta += this.kypara.getHinta();
        
        System.out.println("Paketin kokonaishinta on " + hinta);
    }
}
