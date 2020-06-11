45. Tee node-sovellus, jossa on login-näyttö ja main-näyttö (tämän näytön sisällöllä ei ole väliä). Käyttäjän täytyy aina kirjautua ennenkuin hän voi navigoida sovelluksen muille sivuille. Toteuta sovellus niin, että kirjautumistieto on tallennettu sessioon. Lisää tehtävää varten asiakas-tauluun kentät tunnus ja salasana ja toteuta login-toiminto niin että käyt tarkistamassa tietokannasta em. tiedot. HUOM! Tässä tehtävässä käyttäjä saa navigoida main-sivulle vaikka hän ei olisi vielä kirjautunut.

46. Muuta edellistä tehtävää niin, että käyttäjä voi kirjautua ulos sovelluksesta. Toteuta tämä niin, että main-näytöllä on linkki, jossa lukee "Logout XX", missä XX on kirjautunee käyttäjän NIMI (Ei siis tunnus, jota kysyttiin). Kun käyttäjä klikkaa linkkiä, tyhjennä sessio ja ohjaa käyttäjä automaattisesti login-näytölle.

47. Muuta edellistä tehtävää: jos käyttäjä yrittää navigoida sellaiselle sivulle (tai url:iin), jota ei ole olemassa, näytä käyttäjälle oma tekemäsi sivu, jossa on vain teksti "Haluamaasi sivua ei löydy" ja linkki, joka ohjaa login-sivulle.

48. Lisää edellisiin tehtäviin: jos käyttäjä yrittää navigoida main-sivulle ilman kirjautumista, ohjataan hänet automaattisesti login-sivulle. Tämä kannattaa yrittää toteuttaa middleware:n avulla.
