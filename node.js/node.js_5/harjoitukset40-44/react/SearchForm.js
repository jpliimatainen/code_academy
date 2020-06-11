/*
 * Node.js
 * Tehtävät 42-44
 *
 * Juha-Pekka Liimatainen 13.1.2020
*/

import React, { useState } from 'react';

const SearchForm = props => {
    const [activeFlag, setActiveFlag] = useState(0);

    const toggleActiveFlag = event => {
        setActiveFlag(event.target.checked ? 1 : 0);
    }

    const submitForm = () => {
        props.search(activeFlag);
    };

    return (
        <form>
            <h4>Hae asiakkaat:</h4>
            <div>
                <input type="checkbox" onChange={toggleActiveFlag} /> Ei-aktiiviset asiakkaat
            </div>
            <input type="button" value="Hae" onClick={submitForm} />
        </form>
    );
};

export default SearchForm;