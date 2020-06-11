/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 3
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

public class Isannoitsija {
    private String nimi;
    private String puhelin;
    private String sahkoposti;
    private String osoite;

    public Isannoitsija() {
        this("", "", "", "");
    }

    public Isannoitsija(String nimi, String puhelin, String sahkoposti, String osoite) {
        this.nimi = nimi;
        this.puhelin = puhelin;
        this.sahkoposti = sahkoposti;
        this.osoite = osoite;
    }

    public String getNimi() {
        return nimi;
    }

    public void setNimi(String nimi) {
        this.nimi = nimi;
    }

    public String getPuhelin() {
        return puhelin;
    }

    public void setPuhelin(String puhelin) {
        this.puhelin = puhelin;
    }

    public String getSahkoposti() {
        return sahkoposti;
    }

    public void setSahkoposti(String sahkoposti) {
        this.sahkoposti = sahkoposti;
    }

    public String getOsoite() {
        return osoite;
    }

    public void setOsoite(String osoite) {
        this.osoite = osoite;
    }

    @Override
    public String toString() {
        return "nimi: " + nimi + ", puhelin: " + puhelin + ", sahkoposti: " 
                + sahkoposti + ", osoite: " + osoite;
    }
}
