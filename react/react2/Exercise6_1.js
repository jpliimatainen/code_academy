/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävät 26-27)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 15.11.2019
*/

import React from 'react';
import axios from 'axios';
import Hakulomake from './Hakulomake';
import LisaysLomake from './LisaysLomake';
import Asiakkaat from './Asiakkaat';
import './index.css';
import './custom3.css';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      queryData: {},
      types: [ // array for customer types
        { id: 0, code: "NONE", description: "Valitse asiakastyyppi" }
      ],
      isLoading: false, // flag if content is being fetched
      showInsertForm: false,
      lastNoResults: null, // timestamp for the last rendering of a no results message
      searchDone: false,
    };
  }

  componentDidMount() {
    // get customer types
    axios.get('http://localhost:3002/types')
      .then(response => {
        // append types to the array
        let tmp = this.state.types;
        tmp.push(...response.data);
        this.setState({
          types: tmp,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // execute once in 2 seconds
    this.timerId = setInterval(() =>
      this.tick(),
      2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  // fetch data based on the user query
  handleSearch = query => {
    const data = this.createDataObject(query);
    this.submitQuery(data);
    this.setState({
      searchDone: true,
    });
  }

  // create a new customer
  handleInsert = customer => {
    if (customer == null) { // cancel button clicked
      // close the form
      this.setState({
        showInsertForm: false,
      })
    }
    else {
      // transform customer type id (string) into int
      const customerData = this.typeIdToInt(customer);
      // create a new customer
      this.createCustomer(customerData);
    }
  }

  createDataObject = (data) => {
    let dataObject = {};

    if (data !== null) {
      if (data.name !== "") { // name entered
        dataObject.name = data.name;
      }
      if (data.address !== "") { // address entered
        dataObject.address = data.address;
      }
      if (data.zipCode !== "") { // zipCode entered
        dataObject.zipCode = data.zipCode;
      }
      if (data.town !== "") { // town entered
        dataObject.town = data.town;
      }
      if (data.phone !== "") { // phone entered
        dataObject.phone = data.phone;
      }
      if (data.typeId !== "0") { // customer type selected
        dataObject.typeId = data.typeId;
      }
    }
    this.setState({
      queryData: dataObject,
    });

    return dataObject;
  }

  submitQuery = queryData => {
    // change state to "loading"
    this.setState({
      isLoading: true,
    });

    // get customers based on the query data
    axios.get('http://localhost:3002/customers', {
      params: queryData,
    })
      .then(response => {
        this.setState({
          // save search result
          customers: response.data,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createCustomer = customer => {
    // change state to "loading"
    this.setState({
      isLoading: true,
    });
    axios.post('http://localhost:3002/customers',
      customer)
      .then(response => {
        this.setState({
          isLoading: false,
          // close insert form
          showInsertForm: false,
        });
        // reload customer table with search conditions
        this.submitQuery(this.state.queryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  typeIdToInt(customerData) {
    customerData.typeId = parseInt(customerData.typeId);
    return customerData;
  }

  handleDelete = (customerId, customerName) => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan " + customerName + "?")) {
      this.deleteCustomer(customerId);
    }
  }

  // delete a customer
  deleteCustomer = customerId => {
    axios.delete('http://localhost:3002/customers/' + customerId)
      .then(response => {
        // reload customer table with search conditions
        this.submitQuery(this.state.queryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  displayInsertForm = () => {
    this.setState({
      showInsertForm: true,
    });
  }

  tick = () => {
    const { isLoading, showInsertForm, customers, lastNoResults, searchDone } = this.state;

    if (!isLoading && !showInsertForm && searchDone && customers.length === 0) {
      const now = Date.now();

      if (lastNoResults !== null && (now - lastNoResults > 2000)) { // 2 seconds elapsed
        this.setState({
          // reset value
          lastNoResults: null,
          searchDone: false,
        })
      }
      else if (lastNoResults === null) {
        // set a new timestamp for no result message
        this.setState({
          lastNoResults: Date.now(),
        })
      }
    }
  }

  render() {
    const { customers, types, isLoading, showInsertForm,
      queryData, lastNoResults } = this.state;

    const insertFormClass = showInsertForm ? "show-element" : "hide-element";
    const searchFormClass = showInsertForm ? "hide-element" : "show-element";
    const LoadingInfoClass = isLoading ? "show-element" : "hide-element";
    const customerTableClass = !isLoading && !showInsertForm && customers.length > 0
      ? "show-element" : "hide-element";
    const noResultsClass = !isLoading && !showInsertForm && customers.length === 0 && lastNoResults !== null
      ? "show-element" : "hide-element";

    return (
      <div>
        <LisaysLomake class={insertFormClass} types={types} handleInsert={this.handleInsert} />

        <div className={searchFormClass}><button type="button"
          onClick={() => this.displayInsertForm()}>Lisää uusi</button></div>

        <Hakulomake class={searchFormClass} types={types} queryData={queryData}
          handleSearch={this.handleSearch} />

        <LoadingInfo class={LoadingInfoClass} />

        <Asiakkaat class={customerTableClass} types={types} customers={customers}
          handleDelete={this.handleDelete} />

        <NoResults class={noResultsClass} />
      </div>
    );
  }
}

const LoadingInfo = (props) => <div className={props.class}><h1>Loading...</h1></div>;

/* returns a no result message */
const NoResults = (props) => <div className={props.class}><h4>Annetuilla hakuehdoilla ei löytynyt dataa</h4></div>;

export default CustomerList;
