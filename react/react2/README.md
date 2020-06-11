26. Muuta tehtävää 18 (tai 19) niin että asiakkaat renderöidään komponentilla "Asiakkaat", joka on funktio ("perinteinen" tai nuolisyntaksi versio).

27. Muuta tehtävää 23 niin että ed. tehtävän Asiakkaat-komponentissa renderöidään myös Poista-nappi, mutta itse poisto tehdään "pääkomponentissa" (siis siinä komponentissa, joka sisältää Asiakkaat-komponentin).

28. Muuta tehtävää 7 niin että käytät vain funktio komponentteja. Eli tämä sisältää tietysti myös tehtävän 6!

29. Tee SPA sovellus, jossa on menu (koko ajan näkyvissä): Koti, Asiakkaat ja Autot. Em. menuvaihtoehdot näkyvät siis linkkeinä. Kun käyttäjä klikkaa Koti-linkkiä, näytä tieto "Savonia AMK" ja Savonian yhteystiedot (ks. nettisivuilta). Tee "Koti"-sivusta funktio-komponentti. Tee lisäksi funktio-komponentti Aika, joka renderöi vain kuluvan päivän ja tiedon onko nyt aamu- vai iltapäivä (iltapäivä on klo 14-06, aamupäivä 06-14) ja käytä tätä Aika-komponenttia Koti-sivulla.

30. Lisää edelliseen tehtävään: Autot-sivu on class komponentti! Ko. sivulla näytetään tietoja autoista (autojen tiedot haetaan REST-palvelusta, käytä db.json-tiedostoa tehtävien jälkeen). Tee lisäksi funktio komponentti joka näyttää yksittäisen auton tiedot (ja käytä komponenttia tehtävässä jotenkin). Jos autot on jo haettu, ei niitä haeta uudestaan!

31. Lisää edelliseen tehtävään: käyttäjä ei pääse Autot-sivulle jos hän ei ole ensin rekisteröitynyt. Eli jos käyttäjä yrittää navigoida Autot-sivulle mutta ei ole vielä rekisteröitynyt, näytä hänelle ensin Kirjautumis-sivu. Käyttäjä antaa etunimen ja henkilönumeron (riittää tarkistaa että ne on annettu), jonka jälkeen käyttäjä ohjataan automatic Autot-sivulle. Rekisteröityneen käyttäjän tiedot näkyvät menun alapuolella.

32. Muuta edellistä SPA-tehtävää niin että menu on ylälaidassa vaakatasossa ja linkeissä ei näy alleviivausta ja linkit näkyvät isompana laatikkona.

33. Lisää edelliseen SPA-tehtävään: jos käyttäjä yrittää laittaa selaimen osoiteriville sellaista osoitetta, jota ei löydy (siis localhost:3000/ jälkeen), ohjaa käyttäjä virhesivulle, jossa on teksti "Yritit navigoida sivulle: se_virheellinen_sivu" ja nappi, josta pääsee Koti-sivulle.

34. Lisää edelliseen tehtävään: Asiakkaat-sivulla näytetään asiakkaat (tehtävän 18 REST-apia hyväksikäyttäen) siten että kukin asiakas on linkki (linkissä on asiakkaan nimi). Kun käyttäjä klikkaa ko. linkkiä, näytetään ko. asiakkaan kaikki kentät table-elementissä (riittää siis renderoida otsikkorivi ja varsinainen data-rivi.


