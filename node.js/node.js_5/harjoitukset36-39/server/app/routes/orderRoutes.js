/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
*/

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/orderController');

router.route('/orders')
    .post(ctrl.createOrder);

module.exports = router;