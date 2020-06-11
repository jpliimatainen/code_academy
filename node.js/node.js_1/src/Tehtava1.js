/*
 * Node.js
 * Tehtävä 1
 * 
 * Juha-Pekka Liimatainen 9.12.2019
*/

import React, { useState, useEffect } from 'react';

const Tehtava1 = () => {

    const [customers, setCustomers] = useState([]);
    const [columnLabels, setColumnLabels] = useState([]);

    useEffect(() => {
        setColumnLabels(
            [
                'AsiakasId',
                'Nimi',
                'Osoite',
                'Postinumero',
                'Postitoimipaikka',
                'Lisätty',
                'Asiakastyyppi',
                'TyyppiId'
            ]
        );

        async function fetchCustomers() {
            const response = await fetch('http://localhost:3000/customer');
            const data = await response.json();

            if (data.status !== 'OK') { // an error occured
                console.log("An error occured while fetching customers");
            }
            else {
                setCustomers(data.response);
            }
        }

        fetchCustomers();

    }, []);

    return (
        <table>
            <TableHeader labels={columnLabels} />
            <TableBody data={customers} />
        </table>
    );
};

const TableHeader = (props) => {
    return (
        <thead>
            <tr>
                {props.labels.map((label, i) => <th key={i}>{label}</th>)}
            </tr>
        </thead>
    );
};

const TableBody = (props) => {
    return (
        <tbody>
            {props.data.map((c, i) => <TableRow key={i} data={c} />)}
        </tbody>
    );
};

const TableRow = (props) => {
    const { customerId, name, address, zipCode, town, created, customerType, typeId } = props.data;

    return (
        <tr>
            <td>{customerId}</td>
            <td>{name}</td>
            <td>{address}</td>
            <td>{zipCode}</td>
            <td>{town}</td>
            <td>{created}</td>
            <td>{customerType}</td>
            <td>{typeId}</td>
        </tr>
    );
};

export default Tehtava1;