/*
 * Node.js
 * Tehtävät 22-26
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

import React from 'react';

const StudentTable = props => {
    
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
        'Etunimi',
        'Sukunimi',
        'Osoite',
        'Postinumero',
        'Postitoimipaikka',
        'Tyyppi',
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
            {props.data.map((c, i) => <TableRow key={i} data={c} />)}
        </tbody>
    );
};

const TableRow = props => {
    const { id, firstname, lastname, address, zipcode, town, type } = props.data;

    return (
        <tr>
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{address}</td>
            <td>{zipcode}</td>
            <td>{town}</td>
            <td>{type}</td>
        </tr>
    );
};

export default StudentTable;