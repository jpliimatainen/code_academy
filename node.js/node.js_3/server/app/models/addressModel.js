/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const sql = require('./db');

// execute a query against the database
const dbQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        sql.query(query, params, function (error, result) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};

module.exports = {

    getByName: address => {
        const params = [address];
        const query = "SELECT idosoite, lahiosoite FROM osoite WHERE lahiosoite = ?";

        return dbQuery(query, params);
    },

    create: address => {
        const params = [address];
        const insertQuery = "INSERT INTO osoite(lahiosoite) VALUES(?)";

        return dbQuery(insertQuery, params);
    }
};