/*
 * Node.js
 * Tehtävät 3-5
 * 
 * Juha-Pekka Liimatainen 9.12.2019
*/

import React, { useState, useEffect } from 'react';

const Tehtava35 = () => {

    const [customers, setCustomers] = useState([]);
    const [columnLabels, setColumnLabels] = useState([]);
    const [types, setTypes] = useState([]);
    const [query, setQuery] = useState(null);
    const [searchDone, setSearchDone] = useState(false);

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

        async function fetchTypes() {
            const response = await fetch('http://localhost:3000/type');
            const data = await response.json();

            if (data.status !== 'OK') { // an error occured
                console.log("An error occured while fetching types");
            }
            else {
                setTypes(data.response);
            }
        }

        fetchTypes();

    }, []);

    useEffect(() => {
        async function fetchCustomers() {
            let url = new URL('http://localhost:3000/customer');

            /* Set query paramaters, reference: 
            https://fetch.spec.whatwg.org/#fetch-api */
            Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.status !== 'OK') { // an error occured
                console.log("An error occured while fetching customers");
            }
            else {
                setCustomers(data.response);
            }
        }
        if (query !== null) {
            fetchCustomers();
            setSearchDone(true);
        }

    }, [query]);

    const handleQuery = queryData => {
        let filteredQuery = {};
        for (const property in queryData) {
            if (queryData[property] !== '' && queryData[property] !== '0') {
                filteredQuery[property] = queryData[property]; 
            }
        }
        setQuery(filteredQuery);
    }

    return (
        <div>
            <SearchForm types={types} handleSearch={handleQuery} />
            {customers.length > 0 ?
                <table>
                    <TableHeader labels={columnLabels} />
                    <TableBody data={customers} />
                </table> :
                (searchDone ?
                    < h2 > Ei tuloksia. Kokeile toista hakuehtoa</h2> :
                    null
                )
            }
        </div >
    );
};

const TableHeader = props => {
    return (
        <thead>
            <tr>
                {props.labels.map((label, i) => <th key={i}>{label}</th>)}
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

const SearchForm = props => {
    const [query, setQuery] = useState({
        name: '',
        address: '',
        type: '0',
    });

    let types = [{ typeId: 0, abbr: 'NA', description: 'Valitse asiakasryhmä' }, ...props.types];

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setQuery(query => ({ ...query, [name]: value }));
    }

    const submitForm = () => {
        props.handleSearch(query);
    };
    
    return (
        <form>
            <div>
                <input type="text" name="name" placeholder="Nimi" value={query.name} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="address" placeholder="Osoite" value={query.address} onChange={handleChange} />
            </div>
            <div>
                <select name="type" value={query.type} onChange={handleChange}>
                    {types.map((type, index) => <OptionItem key={type.typeId} value={type.typeId} name={type.description} />)}
                </select>
            </div>
            <input type="button" value="Hae" onClick={submitForm} />
        </form>
    );
};

const OptionItem = props => (
    <option value={props.value}>{props.name}</option>
)

export default Tehtava35;