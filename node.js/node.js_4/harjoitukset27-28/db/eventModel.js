/*
 * Node.js
 * Tehtävät 27-35
 * 
 * Handlebars
 *
 * Juha-Pekka Liimatainen 7.1.2020
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

const getEvents = (upcoming) => {
    let query = "SELECT Id, DATE_FORMAT(Pvm, '%d.%m.%Y') as 'Pvm', Selite FROM tapahtuma";

    if (upcoming !== null && upcoming !== undefined) {
        if (upcoming === 1) { // get upcoming events
            query += " WHERE Pvm > CURDATE()"
        }
        else { // get past events
            query += " WHERE Pvm <= CURDATE()"
        }
    }

    return dbQuery(query, []);
}

module.exports = {
    getUpcomingEvents: () => {
        return getEvents(1);
    }
};