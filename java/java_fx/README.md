Tehtävä 1
Tee käyttöliittymä lottoriviä varten, käyttäen JavaFX-kirjastoa. Omat numerot voidaan syöttää tai siinä on erillinen nappi, jolla oma rivi voidaan arpoa. Ohjelmassa on myös toinen rivi, johon voi syöttää arvonnasta tulleen rivin, rivin alla on nappi osumien tarkastusta varten. Itse toiminnallisuutta ei tarvitse toteuttaa.

Tehtävä 2
Toteuta edellisen tehtävään toiminnallisuudet:
- ”Arvo numerot”-nappi arpoo uudet seitsemän numeroa.
- ”Tarkasta”-nappi tarkastaa montako ylemmän rivin numeroa osui arvottuun alempaan riviin ja ilmoittaa sen uudessa ikkunassa. Uudessa ikkunassa ilmoitetaan vain osumien määrä ja ”Sulje”-nappi

Tehtävä 3
Savoniassa on päätetty tehdä pilottikokeilu, jossa poistoon meneviä tietokoneita sekä tarvikkeita myydään oppilaille verkkokaupan kautta. Pääset osallistumaan projektiin ja käyttämään luovaa ajattelua käyttöliittymän suunnittelussa. Tee JavaFX-kirjastoa käyttäen käyttöliittymä, jossa verkkokauppaan syötetään tuote ja sen tiedot. Tuotteesta tarvittavat tiedot:
- Nimi
- Tuotetyyppi (esim. tietokone, hiiri, monitori). Tämä voisi olla alasvetovalikko.
- Käyttöönottopäivä. Tämä valitaan kalenterista (Date Picker).
- Myyntihinta
- Ostajan nimi
 
Tärkeää on myös, että ruudun ylälaidassa on Savonian logo. Ruudulla lisäksi on alalaidassa ”Tallenna”- ja ”Sulje”-napit, jotka eivät vielä tee mitään.”

Tehtävä 4
Käytä edellisessä tehtävässä luotua käyttöliittymää, jolle tässä tehtävässä tehdään toteutus. Kun toteutusta tehdään, niin käytä kuuntelijoiden esittelyssä Lambda-syntaksia.

Tee luokka Tuote ja käytä sitä ohjelmassa. Luokalla on yksityiset attribuutit:

- Nimi (String)
- Tuotetyyppi (String)
- Kayttoonottopaiva (String)
- Myyntihinta (double)

Tee käyttöliittymän kentille kuuntelijat:

- Kun käyttöliittymällä olevia kenttiä muutetaan, niihin syötetty tieto asetetaan kuuntelijassa Tuote-luokan olion attribuuttiin.

- Tallenna-napin painalluksen kuuntelijassa tarkastetaan, että kaikki tuotteen tiedot on täytetty. Jos joku arvo on tyhjä, ilmoitetaan siitä käyttäjälle ja pyydetään täyttämään tiedot. Jos kaikki kentät ovat täytettynä, lopetetaan ohjelman ajo.

- Sulje-napin painallus lopettaa ohjelman ajon.
