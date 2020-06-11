17. Tee seuraavia tehtäviä varten yksinkertainen REST-api, joka palauttaa tietoja asiakkaista. Asiakkaalla on seuraavat tiedot: id, nimi, osoite, postinumero, postitoimipaikka, puhelinnro, tyyppi_id (joka viittaa asiakastyypin id-kenttään) ja tyyppi_selite. Käytä REST-api:n toteutukseen json-server NPM pakettia. REST-api:ssa on lisäksi tieto asiakastyypeistä (kentät id, lyhenne, selite).

18. Tee React sovellus, jonka avulla voidaan hakea asiakkaita (käyttäen yo:n mukaista REST-rajapintaa). Sovelluksessa on hakuehtokenttä nimelle ja osoitteelle. Kun käyttäjä painaa Hae-nappia, haetaan hakuehtojen mukainen data REST-api:sta. Käyttäjä voi antaa minkä tahansa hakuehtojen kombinaation (tai jättää ne kokonaan antamatta). Haettu data näytetään HTML:n table-elementissä (näytä kaikki kentät).

19. Lisää edelliseen tehtävään hakuehdoksi asiakastyyppi. Hae asiakastyypit alasvetovalikkoon kun sovellus käynnistyy (componentDidMount() event:ssä).

20. Lisää edelliseen tehtävään: kun tietoa haetaan REST-api:sta, näkyy käyttäjälle VAIN teksti Loading ... Kun REST-api palauttaa tiedon, piilotetaan Loading-teksti ja näytetään käyttäjälle haettu data. Tätä varten laita REST-api:iin "viivettä" pari sekuntia (--delay parametrilla).

21. Lisää edelliseen tehtävään: jos annetuilla hakuehdoilla ei löydy dataa, näytetään käyttäjälle HTML table:n tilalla teksti "Annetuilla hakuehdoilla ei löytynyt dataa".

22. Muuta edellistä tehtävää: "Annetuilla hakuehdoilla ei löytynyt dataa" teksti on näkyvissä vain 2s ajan, sen jälkeen teksti häviää pois.

23. Lisää edelliseen tehtävään: käyttäjä voi poistaa valitun asiakkaan. Toteuta tämä niin, että jokaisella rivillä on Poista-nappi, jota painamalla data poistetaan kutsumalla REST-api:a. Poistamisen jälkeen asiakas häviää käyttöliittymästä kun haet datan uudelleen REST-api:n kautta.

24. Lisää edelliseen tehtävään varmistus "Haluatko varmasti poistaa asiakkaan XX?". Käytä varmistuksen näyttämiseen confirm-funktiota.

25. Lisää tehtävään 18: käyttäjä voi myös lisätä uuden asiakkaan. Toteuta tämä niin, että sovelluksessa on nappi "Lisää uusi", joka disabloi kaikki muut napit (ja toiminnot) ja näyttää form:n jolla voi lisätä uuden asiakkaan, form:lla on myös napit Peruuta ja Tallenna. Käytä uuden asiakkaan luomiseen REST-rajapintaa. Hae asiakkaat uudelleen onnistuneen lisäämisen jälkeen jolloin lisätty asiakas näkyy näytöllä (jos hakuehdot olivat "sopivat").
