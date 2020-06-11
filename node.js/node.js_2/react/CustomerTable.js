/*
 * Node.js
 * Tehtävät 6-15
 *
 * Juha-Pekka Liimatainen 16.12.2019
*/

import React from 'react';
import { useHistory } from 'react-router-dom';

const CustomerTable = props => {
    
    return (
        <table>
            <TableHeader />
            <TableBody data={props.data} delete={props.delete} edit={props.edit}/>
        </table>
    );
};

const TableHeader = () => {
    const columnLabels = [
        'Id',
        'Nimi',
        'Osoite',
        'Postinumero',
        'Postitoimipaikka',
        'Lisätty',
        'Muokattu',
        'Asiakastyyppi',
        '',
        ''
    ];

    return (
        <thead>
            <tr>
                {columnLabels.map((label, i) => <th key={i}>{label}</th>)}
            </tr>
        </thead>
    );
};

const TableBody = props => {
    return (
        <tbody>
            {props.data.map((c, i) => <TableRow key={i} data={c} delete={props.delete} edit={props.edit}/>)}
        </tbody>
    );
};

const TableRow = props => {
    const { customerId, name, address, zipCode, town, created, changed, customerType } = props.data;
    const history = useHistory();

    return (
        <tr>
            <td>{customerId}</td>
            <td>{name}</td>
            <td>{address}</td>
            <td>{zipCode}</td>
            <td>{town}</td>
            <td>{created}</td>
            <td>{changed}</td>
            <td>{customerType}</td>
            <td>
                <button type="button" className="delete-button" onClick={() => props.delete(customerId)}>
                    Poista
                </button>
            </td>
            <td>
                <button type="button" className="edit-button" onClick={() => history.push('/edit/' + customerId)}>
                    Muokkaa
                </button>
            </td>
        </tr>
    );
};

export default CustomerTable;