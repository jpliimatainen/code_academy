/*
 * Node.js
 * Tehtävät 42-44
 *
 * Juha-Pekka Liimatainen 13.1.2020
*/

import React, { useState, useEffect } from 'react';

import CustomerTable from './CustomerTable';
import OrderTable from './OrderTable';
import SearchForm from './SearchForm';
import './custom.css';

const CustomerApp = () => {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState(null);

    useEffect(() => {
        async function fetchCustomers() {
            let url = new URL('http://localhost:3000/customers');

            if (query.status === 0) { // active customers
                // Set query paramaters, reference: https://fetch.spec.whatwg.org/#fetch-api
                Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

            }

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
        }
    }, [query]);

    const handleSearch = activeFlag => {
        setQuery({ status: activeFlag });
    };

    const handleFetchOrders = customerId => {
        try {
            const promise = fetchOrders(customerId);
            // read the data from the promise
            promise.then(function (data) {
                if (data.status === 'OK') { // fetch successfully completed
                    setOrders(data.response);
                }
                else { // an error occured
                    console.log(data.msg);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        // close order table
        setOrders([]);
    }

    const fetchOrders = async customerId => {
        const url = 'http://localhost:3000/customers/' + customerId;
        const response = await fetch(url);

        return await response.json();
    }

    return (
        <div>
            <SearchForm search={handleSearch} />
            {customers.length > 0 ?
                <CustomerTable data={customers} function={handleFetchOrders} /> :
                <div></div>
            }
            {orders.length > 0 ?
                <OrderTable data={orders} function={handleClose} /> :
                <div></div>
            }
        </div>
    );
};

export default CustomerApp;