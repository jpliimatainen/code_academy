/*
 * Node.js
 * Tehtävät 42-44
 *
 * Juha-Pekka Liimatainen 13.1.2020
*/

import React from 'react';

const CustomerTable = props => {
    // get column headers
    const headers = Object.keys(props.data[0]);
    // insert an empty header for the button column
    headers.push('');

    return (
        <div className="customer-table">
            <table>
                <TableHeader headers={headers} />
                <TableBody data={props.data} function={props.function} />
            </table>
        </div>
    );
};

const TableHeader = (props) => {
    const headers = props.headers;

    return (
        <thead>
            <tr>
                {headers.map((label, i) => <th key={i}>{label}</th>)}
            </tr>
        </thead>
    );
};

const TableBody = props => {
    return (
        <tbody>
            {props.data.map((c, i) => <TableRow key={i} data={c} function={props.function} />)}
        </tbody>
    );
};

const TableRow = props => {
    const { asiakasId, nimi, kayntiosoite, postinumero, postitoimipaikka, status, tilaukset, yhteissumma } = props.data;

    return (
        <tr>
            <td>{asiakasId}</td>
            <td>{nimi}</td>
            <td>{kayntiosoite}</td>
            <td>{postinumero}</td>
            <td>{postitoimipaikka}</td>
            <td>{status}</td>
            <td>{tilaukset}</td>
            <td>{yhteissumma.toFixed(2)} €</td>
            <td>
                <button type="button" onClick={() => props.function(asiakasId)}>
                    Tilaukset
                </button>
            </td>
        </tr>
    );
};

export default CustomerTable;