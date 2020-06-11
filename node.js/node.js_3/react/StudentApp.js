/*
 * Node.js
 * Tehtävät 22-26
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import StudentTable from './StudentTable';
import InsertForm from './InsertForm';
import SearchForm from './SearchForm';
import './custom.css';

const StudentApp = () => {
    const [posts, setPosts] = useState([]);
    const [students, setStudents] = useState([]);
    const [types, setTypes] = useState([]);
    const [query, setQuery] = useState(null);
    const [searchDone, setSearchDone] = useState(false);
    const [reloadStudents, setReloadStudents] = useState(0);
    const [infoText, setInfoText] = useState('');
    const [emptyFieldErrors, setEmptyFieldErrors] = useState({
        etunimi: false,
        sukunimi: false,
        osoite: false,
        postinro: false,
        postitmp: false,
        tyyppi: false,
    });
    const [zipCodeError, setZipCodeError] = useState('');
    const [insertError, setInsertError] = useState('');

    useEffect(() => {
        async function fetchTypes() {
            const response = await fetch('http://localhost:3000/types?status=0');
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
        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/posts');
            const data = await response.json();

            if (data.status !== 'OK') { // an error occured
                console.log("An error occured while fetching types");
            }
            else {
                setPosts(data.response);
            }
        }

        fetchPosts();

    }, [reloadStudents]); // reload posts when a student is added

    useEffect(() => {
        async function fetchStudents() {
            let url = new URL('http://localhost:3000/students');

            /* Set query paramaters, reference: 
            https://fetch.spec.whatwg.org/#fetch-api */
            Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

            const response = await fetch(url);
            const data = await response.json();

            if (data.status !== 'OK') { // an error occured
                console.log("An error occured while fetching customers");
            }
            else {
                setStudents(data.response);
                setSearchDone(true);
            }
        }

        if (query !== null) {
            fetchStudents();
        }
    }, [query, reloadStudents]);

    const handleSearch = queryData => {
        let filteredQuery = {};
        for (const property in queryData) {
            // ignores empty search fields
            if (queryData[property] !== '' && queryData[property] !== '0') {
                filteredQuery[property] = queryData[property];
            }
        }
        // insert sort by id option
        filteredQuery.sort = 'id';
        setInfoText('');
        setQuery(filteredQuery);
    };

    const handleInsert = (insertData, history) => {
        // delete property
        delete insertData.postinroList;

        // reset error flags
        setEmptyFieldErrors({
            etunimi: false,
            sukunimi: false,
            osoite: false,
            postinro: false,
            postitmp: false,
            tyyppi: false,
        });
        setZipCodeError('');
        setInsertError('');
        
        try {
            const promise = createStudent(insertData);
            // read the value from the promise
            promise.then(function (value) {
                console.log(value);
                if (value.status === 'OK') { // insert successfully completed
                    // reroutes to the home page
                    history.push('/');
                    setInfoText('Opiskelija ' + value.data.firstname + ' ' + value.data.lastname + ' lisätty');
                    // triggers students to be reloaded
                    setReloadStudents(reloadStudents === 0 ? 1 : 0);
                }
                else { // an error occured
                    switch (value.code) {
                        case 1: // missing fields, not possible here
                            break;
                        case 2: // empty fields
                            // set error flags for empty fields
                            setEmptyFieldErrors({
                                etunimi: value.fields.indexOf('etunimi') !== -1 ? true : false,
                                sukunimi: value.fields.indexOf('sukunimi') !== -1 ? true : false,
                                osoite: value.fields.indexOf('osoite') !== -1 ? true : false,
                                postinro: value.fields.indexOf('postinro') !== -1 ? true : false,
                                postitmp: value.fields.indexOf('postitmp') !== -1 ? true : false,
                                tyyppi: value.fields.indexOf('tyyppi') !== -1 ? true : false,
                            });
                            break;
                        case 3: // wrong number of digits in zip code
                            // set error message
                            setZipCodeError(value.msg);
                            break;
                        case 4: // an invalid student type, not possible here
                            break;
                        case 5: // student already inserted
                            setInsertError(value.msg);
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
            etunimi: false,
            sukunimi: false,
            osoite: false,
            postinro: false,
            postitmp: false,
        });
        setZipCodeError('');
        setInsertError('');

        // clears info text
        setInfoText('');
    }

    async function createStudent(data) {
        const url = 'http://localhost:3000/students';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    // combine error flags into a single object
    let errorFlagsProps = { "zipCode": zipCodeError, "insert": insertError };
    errorFlagsProps = Object.assign(errorFlagsProps, emptyFieldErrors);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <InfoText text={infoText} />
                    <InsertNew />
                    <SearchForm types={types} queryData={query} search={handleSearch} />
                    {students.length > 0 ?
                        <StudentTable data={students} /> :
                        (searchDone ?
                            <h2> Ei tuloksia. Kokeile toista hakuehtoa</h2> :
                            <div></div>
                        )
                    }
                </Route>
                <Route path="/add">
                    <InsertForm types={types} posts={posts} errors={errorFlagsProps} insert={handleInsert} cancel={handleCancel} />
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
            <Link to='/add'>Lisää opiskelija</Link>
        </div>
    );
}

export default StudentApp;