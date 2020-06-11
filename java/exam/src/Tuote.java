/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 5
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

public class Tuote extends TuoteBase {
    private String kuvaus;
    private double myyntihinta;
    private boolean varastossa;

    public Tuote() {
        this("", 0.0, false, "", "");
    }

    public Tuote(String kuvaus, double myyntihinta, boolean varastossa, String nimi, String sarjanumero) {
        super(nimi, sarjanumero);
        this.kuvaus = kuvaus;
        this.myyntihinta = myyntihinta;
        this.varastossa = varastossa;
    }
    
    public String getKuvaus() {
        return kuvaus;
    }

    public void setKuvaus(String kuvaus) {
        this.kuvaus = kuvaus;
    }

    public double getMyyntihinta() {
        return myyntihinta;
    }

    public void setMyyntihinta(double myyntihinta) {
        this.myyntihinta = myyntihinta;
    }

    public boolean isVarastossa() {
        return varastossa;
    }

    public void setVarastossa(boolean varastossa) {
        this.varastossa = varastossa;
    }

    @Override
    public void tulostaTuotteenTiedot() {
        System.out.println("Nimi: " + this.getNimi() + "\nSarjanumero: " + 
            this.getSarjanumero() + "\nKuvaus: " + this.getKuvaus() + 
            "\nMyyntihinta: " + this.getMyyntihinta() + "\nVarastossa: " + 
            this.isVarastossa());
    }
}
