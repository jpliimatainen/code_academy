/*
 * Node.js
 * Tehtävät 6-15
 *
 * Juha-Pekka Liimatainen 16.12.2019
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const InsertForm = props => {
    const [query, setQuery] = useState({
        NIMI: '',
        OSOITE: '',
        POSTINRO: '',
        POSTITMP: '',
        ASTY_AVAIN: '0',
    });
    const [serverError, setServerError] = useState(false);

    const errorFlags = props.errors;
    const history = useHistory();

    let types = [{ AVAIN: 0, LYHENNE: 'NA', SELITE: 'Valitse asiakasryhmä' }, ...props.types];

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setQuery(query => ({ ...query, [name]: value }));
    }

    const toggleError = event => {
        setServerError(event.target.checked);
    }

    const submitForm = () => {
        props.insert(query, serverError, history);
    };

    const cancelForm = () => {
        history.push('/');
        props.cancel();
    }

    return (
        <form id="insert-form">
            <h4>Anna asiakkaan tiedot:</h4>
            <div>
                <input className={errorFlags.NIMI ? "error" : ""} type="text" name="NIMI"
                    placeholder="Nimi" value={query.NIMI} onChange={handleChange} />
            </div>
            <div className={errorFlags.NIMI ? "error visible" : "hidden"}>
                Nimi on pakollinen
            </div>
            <div>
                <input className={errorFlags.OSOITE ? "error" : ""} type="text" name="OSOITE"
                    placeholder="Osoite" value={query.OSOITE} onChange={handleChange} />
            </div>
            <div className={errorFlags.OSOITE ? "error visible" : "hidden"}>
                Osoite on pakollinen
            </div>
            <div>
                <input className={(errorFlags.POSTINRO || errorFlags.zipCode !== '') ? "error" : ""} type="text" name="POSTINRO"
                    placeholder="Postinumero" value={query.POSTINRO} onChange={handleChange} />
            </div>
            <div className={errorFlags.POSTINRO ? "error visible" : "hidden"}>
                Postinumero on pakollinen
            </div>
            <div className={errorFlags.zipCode !== '' ? "error visible" : "hidden"}>
                {errorFlags.zipCode}
            </div>
            <div>
                <input className={errorFlags.POSTITMP ? "error" : ""} type="text" name="POSTITMP"
                    placeholder="Postitoimipaikka" value={query.POSTITMP} onChange={handleChange} />
            </div>
            <div className={errorFlags.POSTITMP ? "error visible" : "hidden"}>
                Postitoimipaikka on pakollinen
            </div>
            <div>
                <select className={errorFlags.ASTY_AVAIN ? "error" : ""} name="ASTY_AVAIN"
                    value={query.ASTY_AVAIN} onChange={handleChange}>
                    {types.map((type, index) => <OptionItem key={type.AVAIN} value={type.AVAIN} name={type.SELITE} />)}
                </select>
            </div>
            <div className={errorFlags.ASTY_AVAIN ? "error visible" : "hidden"}>
                asiakasryhmä on pakollinen
            </div>
            <div>
                <input type="checkbox" onChange={toggleError} /> Palvelinvirhe
            </div>
            <div className={errorFlags.server !== '' ? "error visible" : "hidden"}>
                {errorFlags.server}
            </div>
            <input className="button" id="save-button" type="button" value="Tallenna" onClick={submitForm} />
            <input className="button" id="cancel-button" type="button" value="Peruuta" onClick={cancelForm} />
        </form>
    );
};

const OptionItem = props => (
    <option value={props.value}>{props.name}</option>
)

export default InsertForm;