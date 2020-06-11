/* 
 * Webkäyttöliittymäkirjastot
 * 7. Hooks and Effects (Tehtävät 42-45)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 21.11.2019
*/

import React, { useState } from 'react';
import './index.css';

const SearchForm = (props) => {
  const [query, setQuery] = useState(
    {
      name: '',
      address: '',
      zipCode: '',
      town: '',
      phone: '',
      typeId: '0',
    }
  );

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setQuery(query => ({ ...query, [name]: value }));
  }

  const submitForm = () => {
    // pass data to the caller
    props.handleSearch(query);
  }

  const { name, address, zipCode, town, phone, typeId } = query;
  const types = props.types;

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Anna hakuehdot:</p>
      <form>
        <div>
          <input type="text" name="name" value={name} placeholder="Nimi" onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="address" value={address} placeholder="Osoite" onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="zipCode" value={zipCode} placeholder="Postinumero" onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="town" value={town} placeholder="Postitoimipaikka" onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="phone" value={phone} placeholder="Puhelin" onChange={handleChange} />
        </div>
        <div>
          <select name="typeId" value={typeId} onChange={handleChange}>
            {types.map((type, index) => <OptionItem key={type.id} value={type.id} name={type.description} />)}
          </select>
        </div>
        <input type="button" value="Hae" onClick={submitForm} />
      </form>
    </div>
  );
}

/* creates an option item */
const OptionItem = props => (
  <option value={props.value}>{props.name}</option>
)

export default SearchForm;
