/* 
 * Webkäyttöliittymäkirjastot
 * 7. Hooks and Effects (Tehtävät 42-45)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 21.11.2019
*/

import React from 'react';
import './index.css';

const CustomerTable = (props) => {
  
  return (
    <div>
      {props.load ?
        <table>
          <TableHeader />
          <TableBody data={props} />
        </table> :
        <div></div>
      }
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
  const { customers, types } = props.data;

  return (
    <tbody>
      {customers.map((customer, index) => <TableRow key={customer.id} row={index}
        customer={customer} types={types} />)}
    </tbody>
  );
}

const TableRow = (props) => {
  const { customer, types } = props;
  let typeString = '';
  let type = types.find(t => t.id === customer.typeId);

  if (type !== undefined) {
    typeString = type.description + ' (' + type.code + ')';
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
    </tr>
  );
}

export default CustomerTable;