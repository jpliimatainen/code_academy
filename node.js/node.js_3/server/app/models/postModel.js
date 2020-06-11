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
    getByZipCode: zipcode => {
        const params = [zipcode];
        const query = "SELECT postinumero, postitoimipaikka FROM postinro WHERE postinumero = ?";

        return dbQuery(query, params);
    },

    getAll: () => {
        const query = "SELECT postinumero, postitoimipaikka FROM postinro";

        return dbQuery(query, []);
    },

    create: (zipcode, town) => {
        const params = [zipcode, town];
        const insertQuery = "INSERT INTO postinro(postinumero, postitoimipaikka) VALUES(?, ?)";

        return dbQuery(insertQuery, params);
    }
};