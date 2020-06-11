/*
 * Olio-ohjelmointi tentti
 * 
 * Tehtävä 3
 *
 * Juha-Pekka Liimatainen 15.11.2019
 */
package tentti;

import java.util.ArrayList;

public class Asunto {
    private String numero;
    private double pintaAla;
    private ArrayList<Asuja> asujat;

    public Asunto() {
        this("", 0.0, new ArrayList<Asuja>());
    }
    
    public Asunto(String numero, double pintaAla, ArrayList<Asuja> asujat) {
        this.numero = numero;
        this.pintaAla = pintaAla;
        this.asujat = asujat;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public double getPintaAla() {
        return pintaAla;
    }

    public void setPintaAla(double pintaAla) {
        this.pintaAla = pintaAla;
    }

    public ArrayList<Asuja> getAsujat() {
        return asujat;
    }

    public void setAsujat(ArrayList<Asuja> asujat) {
        this.asujat = asujat;
    }

    @Override
    public String toString() {
        String output = "Asunto " + "numero: " + numero + ", pintaAla: " 
                + pintaAla + "\nAsujat:\n";
        
        for (Asuja as : asujat) {
            output += as.toString() + "\n";
        }
        
        return output;
    }
}
