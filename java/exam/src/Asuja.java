/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 3
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

public class Asuja {
    private String etunimi;
    private String sukunimi;

    public Asuja() {
        this("", "");
    }

    public Asuja(String etunimi, String sukunimi) {
        this.etunimi = etunimi;
        this.sukunimi = sukunimi;
    }

    public String getEtunimi() {
        return etunimi;
    }

    public void setEtunimi(String etunimi) {
        this.etunimi = etunimi;
    }

    public String getSukunimi() {
        return sukunimi;
    }

    public void setSukunimi(String sukunimi) {
        this.sukunimi = sukunimi;
    }

    @Override
    public String toString() {
        return "etunimi: " + etunimi + ", sukunimi: " + sukunimi;
    }
    
    
}
