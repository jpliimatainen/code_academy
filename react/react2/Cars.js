/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävä 29-34)
 * 
 * Juha-Pekka Liimatainen 18.11.2019
*/

import React from 'react';
import './index.css';

export default class Cars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [],
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('cars') === null) {
      // fetch cars from server
      this.fetchCars();
      //console.log("tiedosto");
    }
    else {
      // get cars from session storage
      this.setState({
        cars: JSON.parse(sessionStorage.getItem('cars')),
      });
      //console.log("storage");
    }
  }

  fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:3002/autot');

      if (response.status !== 404) {
        const data = await response.json();
        this.setState({
          cars: data,
        });
        // store cars into session storage
        sessionStorage.setItem('cars', JSON.stringify(data));
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  render() {
    return <div><CarTable data={this.state.cars} /></div>;
  }
}

const CarTable = (props) => {
  return (
    <table>
      <TableHeader />
      <TableBody data={props} />
    </table>
  );
}

const TableHeader = () => {
  return (
    <thead>
      <tr style={{fontWeight: 'bold'}}>
        <td>Id</td>
        <td>Merkki</td>
        <td>Malli</td>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  const cars = props.data.data;

  return (
    <tbody>
      {cars.map((car, index) => <TableRow key={car.id} item={car} />)}
    </tbody>
  );
}

const TableRow = (props) => {
  const car = props.item;
  
  return (
    <tr>
      <td>{car.id}</td>
      <td>{car.Merkki}</td>
      <td>{car.Malli}</td>
    </tr>
  );
}