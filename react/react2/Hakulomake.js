/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävät 26-27)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 15.11.2019
*/

import React from 'react';
import './index.css';

export default class Hakulomake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      zipCode: '',
      town: '',
      phone: '',
      typeId: '0', // option value for the default item
    };
  }

  handleChange = event => {
    const target = event.target;
    const fieldName = target.name;
    const value = target.value;

    // update value for a field
    this.setState({
      [fieldName]: value,
    });

  }

  submitForm = () => {
    // pass data to the caller
    this.props.handleSearch(this.state);
  }

  render() {
    const { name, address, zipCode, town, phone, typeId } = this.state;
    const types = this.props.types;

    return (
      <div className={this.props.class}>
        <p style={{ fontWeight: "bold" }}>Anna hakuehdot:</p>
        <form>
          <div>
            <input type="text" name="name" value={name} placeholder="Nimi" onChange={this.handleChange} />
          </div>
          <div>
            <input type="text" name="address" value={address} placeholder="Osoite" onChange={this.handleChange} />
          </div>
          <div>
            <input type="text" name="zipCode" value={zipCode} placeholder="Postinumero" onChange={this.handleChange} />
          </div>
          <div>
            <input type="text" name="town" value={town} placeholder="Postitoimipaikka" onChange={this.handleChange} />
          </div>
          <div>
            <input type="text" name="phone" value={phone} placeholder="Puhelin" onChange={this.handleChange} />
          </div>
          <div>
            <select name="typeId" value={typeId} onChange={this.handleChange}>
              {types.map((type, index) => <OptionItem key={type.id} value={type.id} name={type.description} />)}
            </select>
          </div>
          <input type="button" value="Hae" onClick={this.submitForm} />
        </form>
      </div>
    );
  }
}

/* creates an option item */
const OptionItem = props => (
  <option value={props.value}>{props.name}</option>
)
