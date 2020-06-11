/*
 * Node.js
 * Tehtävät 42-44
 *
 * Juha-Pekka Liimatainen 13.1.2020
*/

import React from 'react';

const OrderRowTable = props => {
    // get column headers
    const headers = Object.keys(props.data[0]);

    return (
        <div>
            <div className="order-row-table">
                <div>
                    <button type="button" onClick={() => props.function()}>
                        Sulje
                </button>
                </div>
                <table>
                    <TableHeader headers={headers} />
                    <TableBody data={props.data} />
                </table>
            </div>
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
            {props.data.map((c, i) => <TableRow key={i} data={c} />)}
        </tbody>
    );
};

const TableRow = props => {
    const { tilausriviId, tuote, maara, yksikko, huomautus, verotonHinta, veroprosentti, 
        toimitettu, tilausid, verotonYht, verollinenYht } = props.data;

    return (
        <tr>
            <td>{tilausriviId}</td>
            <td>{tuote}</td>
            <td>{maara}</td>
            <td>{yksikko}</td>
            <td>{huomautus}</td>
            <td>{verotonHinta.toFixed(2)} €</td>
            <td>{(veroprosentti * 100).toFixed(2)} %</td>
            <td>{toimitettu}</td>
            <td>{tilausid}</td>
            <td>{verotonYht.toFixed(2)} €</td>
            <td>{verollinenYht.toFixed(2)} €</td>
        </tr>
    );
};

export default OrderRowTable;