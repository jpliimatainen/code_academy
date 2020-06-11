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

const ctrl = require('../controllers/postController');

router.route('/posts')
    .get(ctrl.fetchPosts)

module.exports = router;