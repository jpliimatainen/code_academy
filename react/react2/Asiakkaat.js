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

const Asiakkaat = (props) => {
  return (
    <div className={props.class}>
      <table>
        <TableHeader />
        <TableBody data={props} />
      </table>
    </div>
  );
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Nimi</th>
        <th>Osoite</th>
        <th>Postinumero</th>
        <th>Postitoimipaikka</th>
        <th>Puhelin</th>
        <th>Asiakastyyppi</th>
        <th></th>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  const { customers, types, handleDelete } = props.data;

  return (
    <tbody>
      {customers.map((customer, index) => <TableRow key={customer.id} row={index}
        customer={customer} types={types} handleDelete={handleDelete} />)}
    </tbody>
  );
}

const TableRow = (props) => {
  const { customer, types, handleDelete } = props;
  let typeString = '';

  for (let type of types) {
    if (customer.typeId === type.id) {
      typeString = type.description + " (" + type.code + ")";
      break;
    }
  }

  return (
    <tr className={(props.row + 1) % 2 === 0 ? "even" : "odd"}>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.address}</td>
      <td>{customer.zipCode}</td>
      <td>{customer.town}</td>
      <td>{customer.phone}</td>
      <td>{typeString}</td>
      <td>
        <button type="button" style={{ backgroundColor: 'red' }} name={customer.id} onClick={() =>
          handleDelete(customer.id, customer.name)}>Poista</button>
      </td>
    </tr>
  );
}

export default Asiakkaat;