/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 5
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

abstract public class TuoteBase {
    private String nimi;
    private String sarjanumero;

    public TuoteBase() {
        this("", "");
    }
    
    public TuoteBase(String nimi, String sarjanumero) {
        this.nimi = nimi;
        this.sarjanumero = sarjanumero;
    }

    public String getNimi() {
        return nimi;
    }

    public void setNimi(String nimi) {
        this.nimi = nimi;
    }

    public String getSarjanumero() {
        return sarjanumero;
    }

    public void setSarjanumero(String sarjanumero) {
        this.sarjanumero = sarjanumero;
    }
    
    abstract public void tulostaTuotteenTiedot();
}
