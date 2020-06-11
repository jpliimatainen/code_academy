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
    getById: typeId => {
        const params = [typeId];
        const query = "SELECT typeid, selite, status FROM studentype WHERE typeid = ?";

        return dbQuery(query, params);
    },

    getByStatus: status => {
        let params = [];
        let query = "SELECT typeid, selite, status FROM studentype";

        if (status !== null && status !== undefined) {
            query += " WHERE status = ?";
            params.push(status);
        }
        
        return dbQuery(query, params);
    }
};