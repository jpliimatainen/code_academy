/* 
 * Webkäyttöliittymäkirjastot
 * 7. Hooks and Effects (Tehtävät 38-41)
 * 
 * Juha-Pekka Liimatainen 20.11.2019
*/
import React, { useState } from 'react';
import './index.css';
import './custom.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [country, setCountry] = useState({
    countryName: '',
    capital: '',
    population: '',
  });

  const [errors, setErrors] = useState({
    countryExists: false,
    countryName: false,
    capital: false,
    population: false
  });

  // returns the index of the last item in the countries array
  function lastIndex() {
    return countries.length - 1;
  }

  const submit = () => {
    // reset error object
    setErrors({
      countryExists: false,
      countryName: false,
      capital: false,
      population: false
    });

    const errorItems = checkData();

    if (errorItems.length === 0) { // no errors
      // store a new country
      let tmp = [...countries, country];
      setCountries(tmp);
      // reset input fields
      setCountry({
        countryName: '',
        capital: '',
        population: ''
      });
    }
    else {
      // create "a clean" error object
      let errObj = { countryName: false, capital: false, population: false };
      // set error flags
      for (let item of errorItems) {
        errObj[item] = true;
      }
      // save updated errors object
      setErrors(errors => ({ ...errObj }));
    }
  }

  const checkData = () => {
    const errorItems = [];

    if (countries.find(c => c.countryName === country.countryName) !== undefined) {
      // country already added
      errorItems.push('countryExists');
    }

    if (country.countryName.length < 4) {
      errorItems.push('countryName');
    }
    if (country.capital.length < 4) {
      errorItems.push('capital');
    }
    if (country.population === '' || isNaN(country.population)) {
      errorItems.push('population');
    }

    return errorItems;
  }

  const reset = () => {
    // reset countries
    setCountries([]);
    // reset input fields
    setCountry({
      countryName: '',
      capital: '',
      population: ''
    });
  }

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setCountry(country => ({ ...country, [name]: value }));
  }

  const toggleList = event => {
    setShowAll(event.target.checked);
  }

  return (
    <div>
      {errors.countryExists ? <ErrorMsg id="countryExists" /> : null}
      <input className={errors.countryName ? "error" : "valid"} type="text" name="countryName"
        placeholder="Maa" onChange={(e) => { handleChange(e) }} value={country.countryName} />
      {errors.countryName ? <ErrorMsg id="countryName" /> : null}

      <input className={errors.capital ? "error" : "valid"} type="text" name="capital"
        placeholder="Pääkaupunki" onChange={(e) => { handleChange(e) }} value={country.capital} />
      {errors.capital ? <ErrorMsg id="capital" /> : null}

      <input className={errors.population ? "error" : "valid"} type="text" name="population"
        placeholder="Asukasluku" onChange={(e) => { handleChange(e) }} value={country.population} />
      {errors.population ? <ErrorMsg id="population" /> : null}

      <button className="button" type="button" onClick={() => submit()}>Lisää</button>
      <button className="button reset" type="button" onClick={() => reset()}>Tyhjennä</button>
      <div className="checkbox">
        <input type="checkbox" onChange={(e) => toggleList(e)} /> Näytä kaikki
      </div>

      {countries.length > 0 ?
        <div>
          <h4>Viimeisin:</h4>
          <p>{countries[lastIndex()].countryName}, {countries[lastIndex()].capital},
            {countries[lastIndex()].population} milj.</p>
        </div> :
        null
      }

      {countries.length > 0 && showAll ?
        <div>
          <h4>Kaikki:</h4>
          <ul>
            {countries.map((c, i) => <ListItem key={i} data={c} />)}
          </ul>
        </div> :
        null
      }
    </div>
  );
}

const ErrorMsg = (props) => {
  const { id } = props;
  let output = <div></div>;

  switch (id) {
    case 'countryExists':
      output =
        <div className="error-message">
          <p>Maa on jo syötetty.</p>
        </div>;
      break;
    case 'countryName':
      output =
        <div className="error-message">
          <p>Maa pitää olla vähintään 4 merkkiä pitkä.</p>
        </div>;
      break;
    case 'capital':
      output =
        <div className="error-message">
          <p>Pääkaupunki pitää olla vähintään 4 merkkiä pitkä.</p>
        </div>;
      break;
    case 'population':
      output =
        <div className="error-message">
          <p>Asukasluku pitää olla numeroarvo (miljoonaa).</p>
        </div>;
      break;
    default:
  }

  return output;
}

const ListItem = (props) => {
  const { countryName, capital, population } = props.data;

  return <li>{countryName}, {capital}, {population} milj.</li>
}

export default CountryList;