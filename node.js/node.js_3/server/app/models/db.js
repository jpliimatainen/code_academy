/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');

// create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// open MySQL connection
connection.connect(error => {
    if (error) {
        throw error;
    }
    console.log("Successfully connected to the database");
});

module.exports = connection;