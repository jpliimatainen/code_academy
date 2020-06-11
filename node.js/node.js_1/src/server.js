/*
 * Node.js
 * Tehtävät 1-5
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 9.12.2019
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const customerController = require('./customerController');

app.use(bodyParser.json());

const port = 3000;
const hostname = '127.0.0.1';

const cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

app.route('/type')
    .get(customerController.fetchTypes)

app.route('/customer')
    .get(customerController.fetchCustomers)
    //.post(customerController.create);

/*app.route('/customer/:key')
    .delete(customerController.deleteCustomer)
    .put(customerController.updateCustomer);
*/

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});