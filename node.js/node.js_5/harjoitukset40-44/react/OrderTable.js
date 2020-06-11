/*
 * Node.js
 * Tehtävät 42-44
 *
 * Juha-Pekka Liimatainen 13.1.2020
*/

import React, { useState } from 'react';
import OrderRowTable from './OrderRowTable';

const OrderTable = props => {
    const [orderRows, setOrderRows] = useState([]);

    // get column headers
    const headers = Object.keys(props.data[0]);
    // remove 'tilausrivit' header
    headers.pop();
    // insert an empty header for the button column
    headers.push('');

    const handleClose = () => {
        // close order rows table
        setOrderRows([]);
    }

    const handleSetOrderRows = orderRows => {
        setOrderRows(orderRows);
    }

    return (
        <div>
            <div className="order-container"></div>
            <div className="order-table">
                <div>
                    <button type="button" onClick={() => props.function()}>
                        Sulje
                </button>
                </div>
                <table>
                    <TableHeader headers={headers} />
                    <TableBody data={props.data} function={handleSetOrderRows} />
                </table>
            </div>
            {orderRows.length > 0 ?
                <OrderRowTable data={orderRows} function={handleClose} /> :
                <div></div>
            }
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
    const { asiakasId, tilausnumero, tilauspvm, toimituspvm, verotonYht, verollinenYht, tilausrivit } = props.data;

    return (
        <tr>
            <td>{asiakasId}</td>
            <td>{tilausnumero}</td>
            <td>{tilauspvm}</td>
            <td>{toimituspvm}</td>
            <td>{verotonYht.toFixed(2)} €</td>
            <td>{verollinenYht.toFixed(2)} €</td>
            <td>
                <button type="button" onClick={() => { props.function(tilausrivit) }}>
                    Tilausrivit
                </button>
            </td>
        </tr>
    );
};

export default OrderTable;