/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 3
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class Talo {
    private String nimi;
    private String osoite;
    private ArrayList<Asunto> asunnot;
    private Isannoitsija isannoitsija;

    public Talo() {
        this("", "", new ArrayList<Asunto>(), new Isannoitsija());
    }

    public Talo(String nimi, String osoite, ArrayList<Asunto> asunnot, Isannoitsija isannoitsija) {
        this.nimi = nimi;
        this.osoite = osoite;
        this.asunnot = asunnot;
        this.isannoitsija = isannoitsija;
    }
    
    public void tulostaTiedot(int asujat) {
        ArrayList<Asunto> tulostettavat = new ArrayList<>();
        
        for (Asunto as : this.getAsunnot()) {
            if (as.getAsujat().size() > asujat) {
                tulostettavat.add(as);
            }
        }
        
        for (Asunto as : tulostettavat) {
            System.out.println(as.toString());
        }
    }

    public String getNimi() {
        return nimi;
    }

    public void setNimi(String nimi) {
        this.nimi = nimi;
    }

    public String getOsoite() {
        return osoite;
    }

    public void setOsoite(String osoite) {
        this.osoite = osoite;
    }

    public ArrayList<Asunto> getAsunnot() {
        return asunnot;
    }

    public void setAsunnot(ArrayList<Asunto> asunnot) {
        this.asunnot = asunnot;
    }

    public Isannoitsija getIsannoitsija() {
        return isannoitsija;
    }

    public void setIsannoitsija(Isannoitsija isannoitsija) {
        this.isannoitsija = isannoitsija;
    }
    
    
}
