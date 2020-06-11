Tehtävä 1
Tee ohjelma, joka käynnistää useita eri säikeitä yhtäaikaiseen ajoon. Ohjelman toiminta:

- Tee luokka PrintDiamond tulostaa ajettaessa salmiakkikuvion (luokalla on siis yksi metodi, esim. print):
   *
  ***
 *****
*******
 *****
  ***
   *

- Toteuta säie, joka käyttää PrintDiamond-luokkaa kuvion tulostamiseen.
- Ohjelma kysyy käyttäjältä kuinka montako säiettä käynnistetään.
- Ohjelma käynnistää säikeitä halutun määrän, jolloin kuviot tulostuvat ruudulle (mahdollisesti mielivaltaisen sekaisin)

Tehtävä 2
Jos käytit ensimmäisessä tehtävässä Runnable-rajapintaa, niin tee sama toteutus periyttäen Thread-luokasta. Jos taas teit toteutuksen Thread-luokalla, tee toteutus käyttäen Runnable-rajapintaa. Muuta kuitenkin toteutusta niin, että synkronoit (käytä synchronized-määrettä) säikeiden kuvion tulostukseen, etteivät kuviot voi tulostua sekaisin. Eli kun yksi säie on loppunut, niin seuraava jatkaa automaattisesti tulostusta.

Tehtävä 3
Olet selvitellyt yrityksen järjestelmässä piilevää suorituskykyyn liittyvää ongelmaa ja on selvinnyt, että tiedostoon kirjoittaminen pysäyttää ohjelmistojen ajamisen liian pitkäksi aikaa. Päätit ratkaista pulman tekemällä ratkaisun, jossa tiedostoon kirjoittaminen hoidetaan säikeessä taustalla.

Ohjelman toteutus:
- Tee luokka FileUtils, jolla on staattiset metodit ReadFromFile sekä WriteToFile:
    - WriteToFile-metodi ottaa vastaan tiedoston nimen, johon kirjoitetaan, sekä tässä tapauksessa käyttäjän antaman String-muotoisen syötteen. Kun metodia kutsutaan se käynnistää säikeen, jossa käyttäjän syöte kirjoitetaan tiedostoon taustalla. Edellinen syöte kirjoitetaan aina yli, joten ns. append-toimintoa ei tarvitse toteuttaa.
    - ReadFromFile-metodi ottaa vastaan tiedoston nimen, josta sisältöä luetaan ja palauttaa sisällön String-muotoisena käyttäjälle. Huom! Lukemista ei tässä tapauksessa tehdä taustalla.

Pääohjelma kysyy käyttäjältä tiedoston nimen, johon tietoa halutaan kirjoittaa sekä syötteen. Kun käyttäjä on antanut tiedot, kirjoitetaan syöte tiedostoon käyttäen FileUtils-luokan WriteToFile-metodia. Kun kirjoitus on tehty, käynnistetään pääohjelmassa uusi säie, joka odottaa ensin sekunnin ja sen jälkeen tulostaa tiedoston sisällön käyttäen FileUtils-luokan ReadFromFile-methodia.

Tehtävä 4
Ohjelmistoprojektissa tarvitaan viestien lähettämiseen taustalla toimiva ratkaisu, joka tarkkailee viestijonoa ja lähettää viestit mahdollisimman pian.
Päätät toteuttaa ratkaisun, niin että käytät rajapintaa, jotta voit ensin tehdä oman ratkaisun, mutta tarvittaessa korvata sen erilaisella ratkaisulla.
Ohjelman rakenne ja toiminta:
- Tee Viesti-luokka, jossa on yksityiset attribuutit VastaanottajanNimi, VastaanottajanNumero sekä Viesti.
- Tee rajapinta IViestiSender, joka esittelee yhden metodin lahetaViesti. Metodi ottaa vastaan Viesti-olion.
- Tee luokka ViestiSender, joka toteuttaa IViestiSender-rajapinnan. ViestiSenderillä on myös yksityinen synkronoitu tulostaViesti-metodi, tarkkailee luokalla olevaa viestit-jonoa (ArrayList). Tulostusmetodi on käynnistetty säikeeseen luokan alustajassa. Kun lahetaViesti-metodia kutsutaan, lisää se viestit jonoon käyttäjän syöttämän viestin. Viestin lisäämisen herätetään odottava säie kutsumalla notifyAll()-metodia. Vinkki: Katso Jukka Kinnusen luentomonisteesta monitorointi esimerkki. 

- Pääohjelma kysyy käyttäjältä viestin tiedot ja lähettää viestin käyttämällä ViestiSender-luokan lahetaViesti-rajapintaa, jonka jälkeen viesti tulostuu automaattisesti ruudulle.
