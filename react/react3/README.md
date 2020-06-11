36. Tee React sovellus, jossa käyttäjä voi syöttää urheilujoukkueiden nimiä. Kun käyttäjä painaa Tallenna-nappia, lisätään tiedot nappien alla olevaan select-elementtiin. Muuta käyttäjän syöte aina isoiksi kirjaimiksi. Tyhjennä myös syötetyt kentät Tallenna-napin painamisen jälkeen.

37. Lisää edelliseen tehtävään: kun käyttäjä on syöttänyt 5 nimeä, näkyy jossain teksti "Ainakin 5 nimeä on jo syötetty".

38. Tee React-sovellus, jossa käyttäjä voi syöttää maan, pääkaupungin ja asukasluvun (miljoonissa). Kun käyttäjä painaa Lisää-nappia, lisätään tiedot nappien alla olevaan ul-elementtiin niin että tiedot näkyvät li-elementissä muodossa "Suomi, Helsinki, 5.2 milj". Lisää myös Tyhjennä-nappi, jolla voi tyhjentää syttökentät ja kaikki li-elementit.

39. Lisää edelliseen tehtävään: tarkista että käyttäjä syöttänyt vähintään 4 merkkiä maa ja pääkaupunkin kenttään ja että asukasluku on "järkevä". Jos tiedot ovat väärin, herjaa käyttäjälle jollain tavalla.

40. Lisää edelliseen tehtävään: tarkista ettei maata ole jo syötetty aiemmin. Jos on, näytä syöttökenttien yläpuolella punaisella värillä joku virheteksti. Kun käyttäjä muuttaa maata ja painaa uudelleen Save-nappia, häviää virheteksti.

41. Lisää edelliseen tehtävään: oletuksena näkyy vain viimeisimmän syötetyn maan tiedot (esim. p-elementissä). Näytöllä on lisäksi valinta (checkbox), jolla saa näkyviin ul-elementin (tai piiloon).

Seuraavissa tehtävissä käytä hyväksi edellisen kerran REST-apia (tehtävä 33, asiakkaat).

42. Tee React sovellus, jonka avulla voidaan hakea asiakkaita (käyttäen em. REST-rajapintaa). Sovelluksessa on hakuehtokenttä nimelle ja osoitteelle. Kun käyttäjä painaa Hae-nappia, haetaan hakuehtojen mukainen data REST-api:sta. Käyttäjä voi antaa minkä tahansa hakuehtojen kombinaation (tai jättää ne kokonaan antamatta). Haettu data näytetään HTML:n table-elementissä (näytä kaikki kentät).

43. Lisää edelliseen tehtävään hakuehdoksi asiakastyyppi. Hae asiakastyypit alasvetovalikkoon kun sovellus käynnistyy.

44. Lisää edelliseen tehtävään: kun tietoa haetaan REST-api:sta, näkyy käyttäjälle VAIN teksti Loading ... Kun REST-api palauttaa tiedon, piilotetaan Loading-teksti ja näytetään käyttäjälle haettu data. Tätä varten laita REST-api:iin "viivettä" pari sekuntia (--delay parametrilla).

45. Lisää edelliseen tehtävään: jos annetuilla hakuehdoilla ei löydy dataa, näytetään käyttäjälle HTML table:n tilalla teksti "Annetuilla hakuehdoilla ei löytynyt dataa".

