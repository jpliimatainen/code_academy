/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävä 28)
 * 
 * Juha-Pekka Liimatainen 18.11.2019
*/

import React from 'react';
import './index.css';

const Table = (props) => {
  const students = [
    {
      name: "Foo Bar",
      address: "Baz street",
      startYear: "2015",
    },
    {
      name: "Sam Smith",
      address: "Harrington Street",
      startYear: "2018",
    },
    {
      name: "Matti Meikääinen",
      address: "Opistotie",
      startYear: "2019",
    },
    {
      name: "Maija Meikääinen",
      address: "Opistotie",
      startYear: "2016",
    },
  ];

  return (
    <div>
      <table>
        <TableHeader lang="fi" />
        <TableBody data={students} />
      </table>
      <table>
        <TableHeader lang="en" />
        <TableBody data={students} />
      </table>
    </div>
  );
}

const TableHeader = (props) => {
  // use English as the default language
  let nameTitle = "Name";
  let addressTitle = "Address";
  let startYerTitle = "Start Year";

  const lang = props.lang;

  if (lang === "fi") {
    nameTitle = "Nimi";
    addressTitle = "Osoite";
    startYerTitle = "Aloitusvuosi";
  }

  return (
    <thead>
      <tr>
        <th>{nameTitle}</th>
        <th>{addressTitle}</th>
        <th>{startYerTitle}</th>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  let studenList = props.data.map((item, index) => {
    return <TableRow key={index} data={item} />
  });

  return (
    <tbody>
      {studenList}
    </tbody>
  );
}

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.address}</td>
      <td>{props.data.startYear}</td>
    </tr>
  );
}

export default Table;
