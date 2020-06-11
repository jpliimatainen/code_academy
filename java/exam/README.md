Kysymys 3
Tee luokat ja osa AsuntoOyRekisteri-sovellusta. Sen on hallittava seuraavat tiedot:
- Asuja(t) , ts tarkoittaa asunnossa asujaa eli yhtä henkilöä
- Asunto(Asunnot)
- Talo(t) 
- Isännöitsijä(t)

Asujasta tiedetään etunimi, sukunimi

Asunnolla on perustietojen  (asuntonro, neliöt,yms) lisäksi tiedot asunnossa asujista (useita/asunto)

Isännöitsijästä tiedetään nimi, puhelinnumero yms 

Talosta on perustietojen (taloyhtiön nimi, osoite, yms) lisäksi asunnoista (useita/talo) sekä isännöitsijästä (1/talo)

(a) Esittele tarvittavat luokat ja esittele jäsenmuuttujat sekä perusmetodit

(b) Tee luokalle Talo metodi, joka tulostaa ne asunnot ja asujat, joissa on enemmän kuin parametrina saatu määrä asukkaita. Tee tulostuksen ulkoasusta miellyttävä. Eli tulostat asunnon ja se alle asunnossa asujat

Kysymys 4
Laskettelukeskuksen vuokraamoon uusitaan sähköistä järjestelmää. Järjestelmässä on päädytty käyttämään yhtä yliluokkaa, jonka kaikki aliluokat perivät. Yliluokassa on määritelty vuokrattavan kohteen hinta (per pv) sekä käyttöönottopäivä (merkkijonona riittää). Aliluokkia  on neljä ja niillä on erovia ominaisuuksia:
- Sukset: pituus (cm), merkki (merkkijono)
- Monot: koko (kokonaisluku), jaykkyys (double)
- Sauvat: pituus (cm)
- Kypärä: koko (cm), vari (merkkijono)
 
Tee ohjelma, jolla voidaan syöttää vuokrattavien kohteiden tiedot. Vuokraus tehdään tässä tapauksessa aina pakettina, johon kuululuvat kaikki kohteet. Kun tiedot on syötetty ohjelmaan se tulostaa ne ja laskee paketille kokonaishinnan. Pääohjelmassa riittää, että kysytään yhden paketin tiedot ja tulostetaan luoksi se hinnan kera eli mitään monimutkaista käyttöliittymää ei tarvitse tehdä.

Kysymys 5
Verkkokauppaan tehdään laajennuksia, joilla tuotteiden tietoja voidaan noutaa eri valmistajien tietovarastoista. Tietojen nouto toteutetaan käyttäen rajapintaa, jossa on yksi metodi:
public ArrayList<Tuote> getTuoteTiedot();
 
Rajapinnan toteuttavat kameroiden valmistaja Canon sekä Iisalmelainen kauitinvalmistaja Genelec.  Molempien valmistajien luokat, jotka toteuttavat eo rajapintaa, palauttavat testimielessä esim kolme tuotetta.

Tuote-luokkaa (liitteenä) tulee kuitenkin laajentaa niin, että se perii abstraktin luokan TuoteBase, jonka toteutat laajennuksen yhteydessä. TuoteBase-luokassa on tuotteen nimi sekä sarjanumero sekä abstrakti metodi tulostaTuotteenTiedot. Toteuta abstrakti metodi oikeassa paikassa, niin, että se tulostaa tuotteen tiedot.
 
Tee ohjelma, joka hakee tuotteet molemmista rajapinnoista sekä tulostaa tuotteiden kaikki tiedot ruudulle. Pitäisi tulostua siis kuuden eri tuotteen tiedot. Tuotteiden tiedot voit itse keksiä rajapinnat toteuttavien luokkien toteutukseen.
 
Tuote.java:
public class Tuote {
  private String kuvaus;
  private double myyntihinta;
  private boolean varastossa;
  
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
}
