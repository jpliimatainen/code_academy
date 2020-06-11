/*
 * Node.js
 * Tehtävät 22-26
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const InsertForm = props => {
    const [query, setQuery] = useState({
        etunimi: '',
        sukunimi: '',
        osoite: '',
        postinroList: '0',
        postinro: '',
        postitmp: '',
        tyyppi: '0',
    });

    const errorFlags = props.errors;
    const history = useHistory();

    const types = [{ typeid: 0, selite: 'Valitse opiskelijatyyppi' }, ...props.types];
    const posts = props.posts;

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setQuery(query => ({ ...query, [name]: value }));
    }

    const changePost = event => {
        const value = event.target.value;

        // reset values
        setQuery(query => ({ ...query, postinroList: '0', postinro: '', postitmp: '' }));

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].postinumero === value) {
                // set values for zipcode and town
                setQuery(query => ({ ...query, postinroList: value, postinro: value, 
                    postitmp: posts[i].postitoimipaikka }));
                break;
            }
        }
    }

    const submitForm = () => {
        props.insert(query, history);
    };

    const cancelForm = () => {
        history.push('/');
        props.cancel();
    }

    return (
        <form id="insert-form">
            <h4>Anna opiskelijan tiedot:</h4>
            <div className={errorFlags.insert !== '' ? "error visible" : "hidden"}>
                {errorFlags.insert}
            </div>
            <div>
                <input className={errorFlags.etunimi ? "error" : ""} type="text" name="etunimi"
                    placeholder="Etunimi" value={query.etunimi} onChange={handleChange} />
            </div>
            <div className={errorFlags.etunimi ? "error visible" : "hidden"}>
                Etunimi on pakollinen
            </div>
            <div>
                <input className={errorFlags.sukunimi ? "error" : ""} type="text" name="sukunimi"
                    placeholder="Sukunimi" value={query.sukunimi} onChange={handleChange} />
            </div>
            <div className={errorFlags.sukunimi ? "error visible" : "hidden"}>
                Sukunimi on pakollinen
            </div>
            <div>
                <input className={errorFlags.osoite ? "error" : ""} type="text" name="osoite"
                    placeholder="Osoite" value={query.osoite} onChange={handleChange} />
            </div>
            <div className={errorFlags.osoite ? "error visible" : "hidden"}>
                Osoite on pakollinen
            </div>
            <div>
                <select className={errorFlags.postinro ? "error" : ""} name="postinroList"
                    value={query.postinroList} onChange={changePost}>
                    <option value='0'>Valitse postinumero</option>
                    {posts.map((post, index) => <OptionItem key={post.postinumero} value={post.postinumero} name={post.postinumero} />)}
                </select>
            </div>
            <div className={errorFlags.postinro ? "error visible" : "hidden"}>
                Postinumero on pakollinen
            </div>
            <div>
                <input className={(errorFlags.postinro || errorFlags.zipCode !== '') ? "error" : ""} type="text" name="postinro"
                    placeholder="Postinumero" value={query.postinro} onChange={handleChange} />
            </div>
            <div className={errorFlags.postinro ? "error visible" : "hidden"}>
                Postinumero on pakollinen
            </div>
            <div className={errorFlags.zipCode !== '' ? "error visible" : "hidden"}>
                {errorFlags.zipCode}
            </div>
            <div>
                <input className={errorFlags.postitmp ? "error" : ""} type="text" name="postitmp"
                    placeholder="Postitoimipaikka" value={query.postitmp} onChange={handleChange} />
            </div>
            <div className={errorFlags.postitmp ? "error visible" : "hidden"}>
                Postitoimipaikka on pakollinen
            </div>
            <div>
                <select className={errorFlags.tyyppi ? "error" : ""} name="tyyppi"
                    value={query.tyyppi} onChange={handleChange}>
                    {types.map((type, index) => <OptionItem key={type.typeid} value={type.typeid} name={type.selite} />)}
                </select>
            </div>
            <div className={errorFlags.tyyppi ? "error visible" : "hidden"}>
                Opiskelijatyyppi on pakollinen
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