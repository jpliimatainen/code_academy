/*
 * Node.js
 * Tehtävät 22-26
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

import React, { useState } from 'react';

const SearchForm = props => {
    const queryData = props.queryData;
    
    const [query, setQuery] = useState({
        etunimi: (queryData !== null && 'etunimi' in queryData) ? queryData.etunimi : '',
        sukunimi: (queryData !== null && 'sukunimi' in queryData) ? queryData.sukunimi : '',
        tyyppi: (queryData !== null && 'tyyppi' in queryData) ? queryData.tyyppi : '0',
    });

    const types = [{ typeid: 0, selite: 'Valitse opiskelijatyyppi' }, ...props.types];

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
                <input type="text" name="etunimi" placeholder="Etunimi" value={query.etunimi} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="sukunimi" placeholder="Sukunimi" value={query.sukunimi} onChange={handleChange} />
            </div>
            <div>
                <select name="tyyppi" value={query.tyyppi} onChange={handleChange}>
                    {types.map((type, index) => <OptionItem key={type.typeid} value={type.typeid} name={type.selite} />)}
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