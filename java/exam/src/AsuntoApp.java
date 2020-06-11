/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 3
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class AsuntoApp {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Asuja asuja1 = new Asuja("etunimi1", "sukunimi1");
        Asuja asuja2 = new Asuja("etunimi2", "sukunimi2");
        Asuja asuja3 = new Asuja("etunimi3", "sukunimi3");
        Asuja asuja4 = new Asuja("etunimi4", "sukunimi4");
        Asuja asuja5 = new Asuja("etunimi5", "sukunimi5");
        Asuja asuja6 = new Asuja("etunimi6", "sukunimi6");
        Asuja asuja7 = new Asuja("etunimi7", "sukunimi7");
        Asuja asuja8 = new Asuja("etunimi8", "sukunimi8");
        Asuja asuja9 = new Asuja("etunimi9", "sukunimi9");
        Asuja asuja10 = new Asuja("etunimi10", "sukunimi10");
        Asuja asuja11 = new Asuja("etunimi11", "sukunimi11");
        Asuja asuja12 = new Asuja("etunimi10", "sukunimi12");
        
        ArrayList<Asuja> asujat1 = new ArrayList<>();
        asujat1.add(asuja1);
        asujat1.add(asuja2);
        asujat1.add(asuja3);
        
        ArrayList<Asuja> asujat2 = new ArrayList<>();
        asujat2.add(asuja4);
        asujat2.add(asuja5);
        asujat2.add(asuja6);
        asujat2.add(asuja5);
        asujat2.add(asuja6);
        asujat2.add(asuja7);
        asujat2.add(asuja8);
        
        ArrayList<Asuja> asujat3 = new ArrayList<>();
        asujat3.add(asuja9);
        asujat3.add(asuja10);
        asujat3.add(asuja11);
        asujat3.add(asuja12);
        
        Asunto asunto1 = new Asunto("1", 41.5, asujat1);
        Asunto asunto2 = new Asunto("2", 90.0, asujat2);
        Asunto asunto3 = new Asunto("3", 65.5, asujat3);
        
        
        ArrayList<Asunto> asunnot = new ArrayList<>();
        asunnot.add(asunto1);
        asunnot.add(asunto2);
        asunnot.add(asunto3);
        
        
        Talo talo1 = new Talo("talo1", "microkatu", asunnot, new Isannoitsija(
                "matti", "0401234789", "posti@posti.fi", "microkatu"
        ));
        
        System.out.println("Enemmän kuin 4 asujaa:");
        talo1.tulostaTiedot(4);
        System.out.println("Enemmän kuin 3 asujaa:");
        talo1.tulostaTiedot(3);
    }
    
}
