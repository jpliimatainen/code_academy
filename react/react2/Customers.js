/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävä 29-34)
 * 
 * Juha-Pekka Liimatainen 18.11.2019
*/

import React from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams
} from 'react-router-dom';

const Customers = (props) => {
  const data = props.data;

  return (
    <Router>
      <div>
        <h2>
          Asiakkaat:
        </h2>
        <ul>
          {data.map((customer, index) => <ListItem key={customer.id} item={customer} />)}
        </ul>

        <Switch>
          <Route path="/asiakkaat/:id" children={<Customer data={data} />} />
        </Switch>
      </div>
    </Router>
  );    
}

const ListItem = (props) => {
  const customer = props.item;

  return (
    <li>
      <Link to={`/asiakkaat/${customer.id}`}>{customer.name}</Link>
    </li>
  );
}

const Customer = (props) => {
  const { id } = useParams();
  const customers = props.data;
  let customer = { };
  
  for (let c of customers) {
    if (c.id === parseInt(id)) {
      customer = c;
      break;
    }
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nimi</th>
          <th>Osoite</th>
          <th>Postinumero</th>
          <th>Postitoimipaikka</th>
          <th>Puhelin</th>
          <th>Asiakastyyppi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{customer.address}</td>
          <td>{customer.zipCode}</td>
          <td>{customer.town}</td>
          <td>{customer.phone}</td>
          <td>{customer.typeId}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Customers;