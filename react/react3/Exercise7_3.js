/* 
 * Webkäyttöliittymäkirjastot
 * 7. Hooks and Effects (Tehtävät 42-45)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 21.11.2019
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import CustomerTable from './CustomerTable';
import './index.css';
import './custom3.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [query, setQuery] = useState({})

  useEffect(() => {
    const fetchTypes = async () => {
      const result = await axios(
        'http://localhost:3002/types'
      );

      setTypes([{ id: 0, code: "NONE", description: "Valitse asiakastyyppi" }, ...result.data]);
    }

    fetchTypes();
  }, []);

  useEffect(() => {
    const submitQuery = () => {
      // change state to "loading"
      setIsLoading(true);

      // get customers based on the query data
      axios.get('http://localhost:3002/customers', {
        params: query,
      })
        .then(response => {
          setCustomers(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    submitQuery();
  }, [query]);

  const createQueryObject = (data) => {
    let queryObject = {};

    if (data !== null) {
      if (data.name !== "") { // name entered
        queryObject.name = data.name;
      }
      if (data.address !== "") { // address entered
        queryObject.address = data.address;
      }
      if (data.zipCode !== "") { // zipCode entered
        queryObject.zipCode = data.zipCode;
      }
      if (data.town !== "") { // town entered
        queryObject.town = data.town;
      }
      if (data.phone !== "") { // phone entered
        queryObject.phone = data.phone;
      }
      if (data.typeId !== "0") { // customer type selected
        queryObject.typeId = data.typeId;
      }

      setQuery(queryObject);
    }
  }

  const handleSearch = query => {
    createQueryObject(query);
    setSearchDone(true);
  }

  return (
    <div>
      <SearchForm types={types} handleSearch={handleSearch} />
      <LoadingInfo load={isLoading && searchDone} />
      <CustomerTable load={!isLoading && customers.length > 0 && searchDone} types={types} customers={customers} />
      <NoResults load={!isLoading && customers.length === 0 && searchDone} />
    </div>
  );
}

const LoadingInfo = (props) =>
  <div className={props.load ? "show-element" : "hide-element"}>
    <h1>Loading...</h1>
  </div>;

/* returns a no result message */
const NoResults = (props) =>
  <div className={props.load ? "show-element" : "hide-element"}>
    <h4>Annetuilla hakuehdoilla ei löytynyt dataa</h4>
  </div>;

export default CustomerList;
