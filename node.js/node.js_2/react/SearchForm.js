/*
 * Node.js
 * Tehtävät 6-15
 *
 * Juha-Pekka Liimatainen 16.12.2019
*/

import React, { useState } from 'react';

const SearchForm = props => {
    const queryData = props.queryData;
    
    const [query, setQuery] = useState({
        name: (queryData !== null && 'name' in queryData) ? queryData.name : '',
        address: (queryData !== null && 'address' in queryData) ? queryData.address : '',
        type: (queryData !== null && 'type' in queryData) ? queryData.type : '0',
    });

    let types = [{ AVAIN: 0, LYHENNE: 'NA', SELITE: 'Valitse asiakasryhmä' }, ...props.types];

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setQuery(query => ({ ...query, [name]: value }));
    }

    const submitForm = () => {
        props.search(query);
    };
    
    return (
        <form>
            <h4>Anna hakuehdot:</h4>
            <div>
                <input type="text" name="name" placeholder="Nimi" value={query.name} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="address" placeholder="Osoite" value={query.address} onChange={handleChange} />
            </div>
            <div>
                <select name="type" value={query.type} onChange={handleChange}>
                    {types.map((type, index) => <OptionItem key={type.AVAIN} value={type.AVAIN} name={type.SELITE} />)}
                </select>
            </div>
            <input type="button" value="Hae" onClick={submitForm} />
        </form>
    );
};

const OptionItem = props => (
    <option value={props.value}>{props.name}</option>
)

export default SearchForm;