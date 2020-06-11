/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/studentController');

router.route('/students')
    .get(ctrl.fetchStudents)
    .post(ctrl.createStudent);

module.exports = router;