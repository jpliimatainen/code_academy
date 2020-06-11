/*
 * Node.js
 * Tehtävät 6-15
 *
 * Juha-Pekka Liimatainen 16.12.2019
*/

import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import CustomerTable from './CustomerTable';
import EditForm from './EditForm';
import InsertForm from './InsertForm';
import SearchForm from './SearchForm';
import './custom.css';

const CustomerApp = () => {
    const [customers, setCustomers] = useState([]);
    const [types, setTypes] = useState([]);
    const [query, setQuery] = useState(null);
    const [searchDone, setSearchDone] = useState(false);
    const [reloadCustomers, setReloadCustomers] = useState(0);
    const [infoText, setInfoText] = useState('');
    const [emptyFieldErrors, setEmptyFieldErrors] = useState({
        NIMI: false,
        OSOITE: false,
        POSTINRO: false,
        POSTITMP: false,
        ASTY_AVAIN: false,
    });
    const [zipCodeError, setZipCodeError] = useState('');
    const [serverError, setServerError] = useState('');
    const [changeError, setChangeError] = useState('');

    useEffect(() => {
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
                setSearchDone(true);
            }
        }

        if (query !== null) {
            fetchCustomers();
        }
    }, [query, reloadCustomers]);

    const handleSearch = queryData => {
        let filteredQuery = {};
        for (const property in queryData) {
            // ignores empty search fields
            if (queryData[property] !== '' && queryData[property] !== '0') {
                filteredQuery[property] = queryData[property];
            }
        }
        setInfoText('');
        setQuery(filteredQuery);
    };

    const handleInsert = (insertData, errorFlag, history) => {
        // reset error flags
        setEmptyFieldErrors({
            NIMI: false,
            OSOITE: false,
            POSTINRO: false,
            POSTITMP: false,
            ASTY_AVAIN: false,
        });
        setZipCodeError('');
        setServerError('');

        // append the flag for implementing a server error
        const returnObj = Object.assign(insertData, { error: errorFlag });

        try {
            const promise = createCustomer(returnObj);
            // read the value from the promise
            promise.then(function (value) {
                if (value.status === 'OK') { // insert successfully completed
                    // reroutes to the home page
                    history.push('/');
                    setInfoText('Asiakas ' + value.data[0].NIMI + ' lisätty');
                    // triggers customers to be reloaded
                    setReloadCustomers(reloadCustomers === 0 ? 1 : 0);
                }
                else { // an error occured
                    switch (value.code) {
                        case 1: // missing fields, not possible here
                            break;
                        case 2: // empty fields
                            // set error flags for empty fields
                            setEmptyFieldErrors({
                                NIMI: value.fields.indexOf('NIMI') !== -1 ? true : false,
                                OSOITE: value.fields.indexOf('OSOITE') !== -1 ? true : false,
                                POSTINRO: value.fields.indexOf('POSTINRO') !== -1 ? true : false,
                                POSTITMP: value.fields.indexOf('POSTITMP') !== -1 ? true : false,
                                ASTY_AVAIN: value.fields.indexOf('ASTY_AVAIN') !== -1 ? true : false,
                            });
                            break;
                        case 3: // wrong number of digits in zip code
                            // set error message
                            setZipCodeError(value.msg);
                            break;
                        case 4: // server error
                            // set error message
                            setServerError(value.msg);
                            break;
                        default:
                            break;
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        try {
            const promise = deleteCustomer(id);

            promise.then(function (value) {
                // triggers customers to be reloaded
                setReloadCustomers(reloadCustomers === 0 ? 1 : 0);
                setInfoText('');
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (editData, history) => {
        // reset error flags
        setEmptyFieldErrors({
            NIMI: false,
            OSOITE: false,
            POSTINRO: false,
            POSTITMP: false,
            ASTY_AVAIN: false,
        });
        setZipCodeError('');
        setChangeError('');
        
        try {
            const promise = editCustomer(editData);
            // read the value from the promise
            promise.then(function (value) {
                if (value.status === 'OK') { // edit successfully completed
                    // reroutes to the home page
                    history.push('/');
                    setInfoText('Asiakas ' + value.data[0].NIMI + ' päivitetty');
                    // triggers customers to be reloaded
                    setReloadCustomers(reloadCustomers === 0 ? 1 : 0);
                }
                else { // an error occured
                    switch (value.code) {
                        case 1: // missing fields, not possible here
                            break;
                        case 2: // empty fields
                            // set error flags for empty fields
                            setEmptyFieldErrors({
                                NIMI: value.fields.indexOf('NIMI') !== -1 ? true : false,
                                OSOITE: value.fields.indexOf('OSOITE') !== -1 ? true : false,
                                POSTINRO: value.fields.indexOf('POSTINRO') !== -1 ? true : false,
                                POSTITMP: value.fields.indexOf('POSTITMP') !== -1 ? true : false,
                                ASTY_AVAIN: value.fields.indexOf('ASTY_AVAIN') !== -1 ? true : false,
                            });
                            break;
                        case 3: // wrong number of digits in zip code
                            // set error message
                            setZipCodeError(value.msg);
                            break;
                        case 4: // server error
                            // set error message
                            setServerError(value.msg);
                            break;
                        case 5: // error in change time
                            // set error message
                            setChangeError('Virheellinen aikaleima. Valitse "Peruuta"');
                            break;
                        default:
                            break;
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        // reset error flags
        setEmptyFieldErrors({
            NIMI: false,
            OSOITE: false,
            POSTINRO: false,
            POSTITMP: false,
            ASTY_AVAIN: false,
        });
        setZipCodeError('');
        setServerError('');
        setChangeError('');

        // clears info text
        setInfoText('');
    }

    async function createCustomer(data) {
        const url = 'http://localhost:3000/customer';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    async function deleteCustomer(id) {
        const url = 'http://localhost:3000/customer/' + id;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        return response;
    }

    async function editCustomer(data) {
        const url = 'http://localhost:3000/customer/' + data.AVAIN;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    // combine error flags into a single object
    let errorFlagsProps = { "zipCode": zipCodeError, "server": serverError, "change": changeError };
    errorFlagsProps = Object.assign(errorFlagsProps, emptyFieldErrors);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <InfoText text={infoText} />
                    <InsertNew />
                    <SearchForm types={types} queryData={query} search={handleSearch} />
                    {customers.length > 0 ?
                        <CustomerTable data={customers} delete={handleDelete} edit={handleEdit} /> :
                        (searchDone ?
                            <h2> Ei tuloksia. Kokeile toista hakuehtoa</h2> :
                            <div></div>
                        )
                    }
                </Route>
                <Route path="/add">
                    <InsertForm types={types} errors={errorFlagsProps} insert={handleInsert} cancel={handleCancel} />
                </Route>
                <Route path="/edit/:id">
                    <EditForm types={types} errors={errorFlagsProps} edit={handleEdit} cancel={handleCancel} />
                </Route>
            </Switch>
        </Router>
    );
};

const InfoText = (props) => {
    const text = props.text;

    return (
        <div className={text !== '' ? "visible info-text" : "hidden"}>
            {text}
        </div>
    );
};

const InsertNew = () => {
    return (
        <div id="insert-button">
            <Link to='/add'>Lisää asiakas</Link>
        </div>
    );
}

export default CustomerApp;