36. Tee REST-rajapinta, joka palauttaa asiakkaan tiedot (kaikki Asiakas-taulun kentät, lisäksi palauta tieto kuinka monta eri tilausta asiakkaalla on ja mikä on niiden yhteissumma). Hakuehtona tulee ainoastaan tieto, palautetaanko vain aktiiviset asiakkaat vai kaikki asiakkaat.

37. Tee REST-rajapinta, joka palauttaa asiakkaan kaikki tilaukset ja kunkin tilauksen tilausrivit. Kullakin tilausrivillä täytyy olla myös kenttä, joka kertoo ko. tilausrivin kokonaishinnat (verottoman ja verollisen). Lisäksi tilaukselle pitää palauttaa koko tilauksen hinta (verollinen ja veroton).

38. Tee REST-rajapinta, jonka avulla voidaan lisätä tilaus ja tilausrivit (yhdellä REST-kutsulla).

39. Tee REST-rajapinta, jonka avulla voidaan poistaa asiakas. Asiakkaan saa poistaa VAIN jos siihen EI liity yhtään tilausriviä, jonka tila on toimitettu (ts. jos asiakkaalle on jo toimitettu jotain, ei tällaista asiakasta saa poistaa).

40. Muuta edellistä tehtävää niin, että jos asiakkaaseen liittyy tilausrivi, joka on jos toimitettu, "merkataan" asiakas poistetuksi. Ts. muuta asiakkaan status arvoon 1. Muuten poista asiakas.

41. Tee REST-rajapinta, jonka avulla voidaan muuttaa tilauksen tilausrivejä. Rajapinta saa parametrina taulukollisen muutettavia tilausrivejä. Toteuta toiminnallisuus niin, että poista ensin KAIKKI tilauksen tilausrivit ja lisää sen jälkeen palveluun tulleet tilausrivit tilaukselle.

42. Toteuta React-sovellus, jonka avulla voidaan hakea kaikki asiakkaat. Hakuehtona on vain checkbox, jolla kerrotaan palautetaanko myös ei-aktiiviset asiakkaat (oletuksena palautetaan vain aktiiviset asiakkaat). Näytä haetut asiakkaat table-elementissä.

43. Lisää edelliseen tehtävään: jokaisella asiakasrivillä on nappi Tilaukset, joka hakee ko. asiakkaan tilaukset ja tilausrivit. Näytä valitun asiakkaan tilaukset toisessa table-elementissä.

44. Lisää edelliseen tehtävään: jokaisella tilausrivillä on nappi Tilausrivit, joka näyttää valitun tilauksen tilausrivit.
