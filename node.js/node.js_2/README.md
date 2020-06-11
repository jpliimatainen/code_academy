(c) Juha-Pekka Liimatainen 2019

Käyttöohjeet:

REST serveri:
- käynnistä (nodemon server.js)

Tiedostot (kansio server):
- server.js (serverin määritykset)
- customerRoutes.js (rettien määritykset)
- customerController.js (REST API funktiot)
- customerSQL.js (tietokantafunkiot)

Rest API kutsut:
GET-kutsut:
http://localhost:3000/customer
parametrit: name, address, type
esim. http://localhost:3000/customer?name=ville&address=opistotie&type=2

http://localhost:3000/customer/[asiakasId]
esim. http://localhost:3000/customer/1


POST-kutsu:
http://localhost:3000/customer/
data (body) muodossa:
{
	"NIMI": "Matti Meikäläinen",
    	"OSOITE": "Kaivokatu 1",
    	"POSTINRO": "00100",
    	"POSTITMP": "Helsinki",
    	"ASTY_AVAIN": 1
}

PUT-kutsu:
http://localhost:3000/customer/[asiakasId]
esim. http://localhost:3000/customer/1
data (body) muodossa:
{
	"NIMI": "Matti Meikäläinen",
    	"OSOITE": "Kaivokatu 1",
    	"POSTINRO": "00100",
    	"POSTITMP": "Helsinki",
    	"ASTY_AVAIN": 1
}

DELETE-kutsu:
http://localhost:3000/customer/[asiakasId]
esim. http://localhost:3000/customer/1


Käyttöliittymä (kansio react):
- asenna react-router-dom (npm i react-router-dom --save)
- käynnistä (npm start)

Tiedostot:
- index.js
- CustomerApp.js (pääkomponenti)
- SearchForm.js (hakulomakekomponentti)
- InsertForm.js (asiakkaan lisäyslomakekomponentti)
- EditForm.js (asiakkaan muokkauslomakekomponentti)
- CustomerTable.js (asiakastaulukkokomponentti)
- index.css (tyylimäärittelyt)
- custom.css (tyylimäärittelyt)


6. Toteuta node.js:llä REST api jonka avulla voidaan lisätä tietokantaan uusi asiakas (käytä POST-metodia). Testaa rajapinnan toimivuus  Postman:n avulla (ota näytönkuva, jossa näkyy miten rajapintaa on kutsuttu ja mitä se on palauttanut).

7. Lisää em. asiakkaan lisäys-palveluun myös parametrien tarkistus. Eli kaikki tiedot ovat pakollisia, jos kutsussa tulee kenttiä, joissa on tyhjiä arvoja (tai joku kenttä puuttuu), palauta tästä jotenkin tieto kutsujalle. Testaa rajapinnan toimivuus Postman:n avulla (ota näytönkuva, jossa näkyy miten rajapintaa on kutsuttu ja mitä se on palauttanut).

8. Toteuta web-sivu, jossa voidaan lisätä uusi asiakas. Tämän voi toteuttaa esimerkiksi niin, että sovelluksessa on nappi "Lisää uusi", joka disabloi kaikki muut napit (ja toiminnot) ja näyttää form:n jolla voi lisätä uuden asiakkaan, form:lla on myös napit Peruuta ja Tallenna. Hae asiakkaat uudelleen onnistuneen lisäämisen jälkeen jolloin lisätty asiakas näkyy näytöllä (jos hakuehdot olivat "sopivat").

9. Lisää edelliseen tehtävään käyttöliittymään koodi, jossa käsittelet jotenkin virhetilanteen REST-api:ssa. Testaa tämä esimerkiksi niin, että käyttöliittymässä on checkbox, johon laittamalla rastin saa virheen serverin päässä aikaiseksi. Helpointa on ehdä tehdä serverin päähän logiikka, joka lukee tuon checkbox-tiedon jostain kentästä (joka siis tulee käyttöliittymästä) ja lisäät SQL-lauseeseen jonkun virheellisen merkin ...

10. Toteuta node.js:llä REST api, jolla voidaa poistaa asiakas (käytä DELETE metodia). Testaa rajapinnan toimivuus  Postman:n avulla (ota näytönkuva, jossa näkyy miten rajapintaa on kutsuttu ja mitä se on palauttanut).

11. Lisää edelliseen tehtävään: jos poistettavaa asiakasta ei löydy, palauta status koodi 404. HUOM! Elävässä elämässä ei ole itse asiassa täyttä selvyyttä mikä status koodi pitäisi palauttaa ...

12. Lisää edelliseen tehtävään: käyttäjä voi poistaa valitun asiakkaan. Toteuta tämä niin, että jokaisella rivillä on Poista-nappi, jota painamalla data poistetaan kutsumalla REST-api:a. Poistamisen jälkeen asiakas häviää käyttöliittymästä kun haet datan uudelleen REST-api:n kautta.

13. Toteuta node.js:llä REST api, jolla voidaan muokata asiakkaan tietoja (käytä PUT metodia). Lisää tietokantaan asiakas-tauluun myös MUUTOSPVM-kenttä (DATETIME), johon lisäät kuluvan kellonajan (sekunnin tarkkuudella) samalla kun teet update:n kantaan. Muuta myös asiakkaan lisäys-palvelua samalla tavalla. Testaa (muutos ja lisäys) rajapinnan toimivuus  Postman:n avulla (ota näytönkuva, jossa näkyy miten rajapintaa on kutsuttu ja mitä se on palauttanut).

14. Lisää aiempaan käyttöliittymään seuraava logiikka: lisää table-elementtiin uusi sarake, jossa on jokaisella rivillä Muuta-linkki (tai button). Ko. linkkiä (tai button:ia) klikkaamalla avautuu vastaavanlainen form kuin lisäyksen tapauksessa, jossa voidaan päivittää valitun asiakkaan tietoja. Toteuta tätä varten REST api palvelu, joka palauttaa id:n mukaisen asiakkaan tiedot (GET metodilla haetaan id:n avulla). Eli hae ensin muutettavan asiakkaan tiedot em. palvelulla ja näytä nämä tiedot form-elementissä. Käyttäjä editoi tietoja ja painaa Save-nappia -> kutsu REST api:a, joka tallettaa uudet tiedot. Tehtävässä EI tarvitse tarkistaa, muuttaako käyttäjä oikeasti tietoja ennen Save-napin painamista.

15. Lisää edelliseen tehtävään: hae asiakkaat ja paina jonkun asiakkaan kohdalla Muuta-nappia. Ennen kuin painat Save-nappia, muuta ko. asiakkaan tietoja toisella välilehdellä (tai muuta tietoja suoraan kantaan, muista tällöin päivittää MUUTOSPVM). Muuta muutos palvelua niin, että palvelu EI päivitä asiakkaan tietoja, jos tiedot ovat muuttuneet kannass sillä aikaa kun data haettiin editoitavaksi. VINKKI: kun haet yksittäisen asiakkaan tiedot, hae samalla MUUTOSPVM. Kun käyttäjä editoi tietoja ja painaa Save-nappia, lähetä serverin päähän myös (muutos palvelulle) myös MUUTOSPVM tieto. Nyt käyttöliittymästä tulee eri MUUTOSPVM kuin mitä on kannasa ...
