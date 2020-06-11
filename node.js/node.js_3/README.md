16. Toteuta REST api, jolla voidaan lisätä tietokantaan uusi opiskelija. Tarkista palvelussa että kaikissa kentissä on järkevät arvot ennenkuin lisäät dataa tietokantaan (arvo ei saa olla tyhjä). Huomaa myös että kutsussa täytyy tulla validi TypeId.

17. Muuta edellistä tehtävää niin, että tarkistat (ennenkuin lisäät opiskelijaa tietokantaan) ettei saman nimistä opiskelijaa ole jo tietokannassa. Tämähän voisi jättää tietokannan huolehdittavaksi, mutta tässä tehtävässä pitää nimenomaan tarkistaa se itse. Palauta tieto jotenkin kutsuvalle ohjelmalle, jos saman niminen opiskelija löytyy jo tietokannasta.

18. Muuta jotain edellistä tehtävää: muuta tietokannan rakenne niin että osoite-tiedot ovat omassa taulussaan ja postitoimipaikka (ja nro) tieto omassa taulussaan (Student-taulussa on viiteavaimena sekä osoite- että postinro-taulun pääavain). Muuta opiskelijan lisäyspalvelua niin, että lisäät osoitteen osoite-tauluun vain jos sitä ei sieltä jo löydy (jos löytyy, käytä viiteavaimena löytyneen osoitteen avainta). Vastaavalla tavalla toimi postinro-taulun kanssa.

19. Lisää edellisiin tehtäviin tarkistus: TypeId ei saa osoittaa sellaiseen riviin, jossa Status=1 (eli jos tyyppi onkin "EI KÄYTÖSSÄ" oleva, ei sitä saa valita).

20. Toteuta REST api, jolla voidaan hakea opiskelijat etu- ja sukunimellä. Toteuta palvelu niin, että jos käyttäjä on antanut *-merkin hakuehdon lopussa (esim. muodossa tii* -> haetaan kaikki tii-alkuiset opiskelijat).

21. Toteuta REST api, jolla voidaan hakea StudentType:t. Palvelulle voi antaa hakuehtona tiedon, palautetaanko vain käytössä olevat vai kaikki.

22. Toteuta React:lla käyttöliittymä, jonka avulla voidaan hakea opiskelijoita. Tässä tehtävässä voit antaa opiskelijatyypin ihan lukuna (ei tarvitse toteuttaa vielä alasvetovalikkoa tyypille). HUOM! Lisää opiskelijatyyppi myös REST-palveluun!

23. Lisää edelliseen tehtävään: opiskelijatyyppi pitää valita alasvetovalikosta (näytä vain käytössä olevat tyypit).

24. Lisää edellisiin (React) tehtäviin: käyttäjä voi lisätä uuden opiskelijan. Tässä tehtävässä voi postinumeron (ja toimipaikan) syöttää käsin.

25. Muuta edellistä tehtävää: postinumeron VOI valita alasvetovalikosta (hae postinumerot REST palvelulla). HUOM! Tai sitten postinumeron voi syöttää käsin kuten edellisessä tehtävässä (ts. jos haluttua postinumeroa ei löydy alasvetovalikosta, käyttäjä syöttää sen ja toimipaikan erilliseen kenttään). Toteuta myös tarvittava REST-palvelu.

26. Lisää edellisiin (React) tehtäviin: virheilmoitukset (esim. saman niminen opiskelija löytyy jo, jne) täytyy esittää jotenkin "järkevästi".
