/* 
 * Webkäyttöliittymäkirjastot
 * 5. Life-cycle methods,... (Tehtävät 17-25)
 * 
 * HUOM!!! Vaatii Axios asennuksen:
 * suorita komento "npm install axios" React projektin hakemistossa
 * 
 * Juha-Pekka Liimatainen 11.11.2019
*/

import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm.js';
import InsertForm from './InsertForm';
import CustomerTable from './CustomerTable.js';
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
      // test if values for the search form input fields should be get from the main component
      insertFlag: false,
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
      // clear insertFlag
      insertFlag: false,
      searchDone: true,
    });
  }

  // create a new customer
  handleInsert = customer => {
    if (customer == null) { // cancel button clicked
      // close the form
      this.setState({
        showInsertForm: false,
        //insertFlag: true,
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
          insertFlag: true,
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
      queryData, insertFlag, lastNoResults } = this.state;

    return (
      <div>
        {showInsertForm ? <InsertForm types={types} handleInsert={this.handleInsert} /> : null}
        {!showInsertForm ?
          <div><button type="button" onClick={() => this.displayInsertForm()}>Lisää uusi</button></div>
          : null
        }
        {!showInsertForm ? <SearchForm types={types} queryData={queryData}
          insertFlag={insertFlag} handleSearch={this.handleSearch} /> : null}
        {isLoading ? <LoadingInfo /> : null}
        {!isLoading && !showInsertForm && customers.length > 0 ?
          <CustomerTable types={types} customers={customers} handleDelete={this.handleDelete} />
          : null
        }
        {!isLoading && !showInsertForm && customers.length === 0 && lastNoResults !== null ?
          <NoResults />
          : null
        }
      </div>
    );
  }
}

const LoadingInfo = () => <div><h1>Loading...</h1></div>;

/* returns a no result message */
const NoResults = () => <div><h4>Annetuilla hakuehdoilla ei löytynyt dataa</h4></div>;

export default CustomerList;
