/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
*/

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/customerController');

router.route('/customers')
    .get(ctrl.fetchCustomersData);

router.route('/customers/:id')
    .get(ctrl.fetchCustomerData)
    .delete(ctrl.deleteCustomer);

module.exports = router;
