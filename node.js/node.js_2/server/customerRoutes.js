/*
 * Node.js
 * Tehtävät 6-15
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 14.12.2019
*/

const express = require('express');
const app = express();
const router = express.Router();

const ctrl = require('./customerController');

router.route('/type')
    .get(ctrl.fetchTypes)

router.route('/customer')
    .get(ctrl.fetchCustomers)
    .post(ctrl.createCustomer);

router.route('/customer/:id')
    .get(ctrl.fetchCustomer)
    .delete(ctrl.deleteCustomer)
    .put(ctrl.editCustomer);

module.exports = router;