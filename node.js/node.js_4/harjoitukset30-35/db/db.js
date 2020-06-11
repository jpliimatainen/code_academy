/*
 * Node.js
 * Tehtävät 27-35
 * 
 * Handlebars
 *
 * Juha-Pekka Liimatainen 7.1.2020
*/

const mysql = require('mysql');
const dbConfig = require('./dbConfig');

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