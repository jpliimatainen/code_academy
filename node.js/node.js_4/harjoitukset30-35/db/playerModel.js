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

module.exports = {
    getPlayers: () => {
        const query = "SELECT p.Sukunimi AS 'Sukunimi', p.Etunimi AS 'Etunimi', p.Pelinumero AS " +
            "'Pelinumero', j.Nimi AS 'Joukkue' FROM pelaaja p JOIN joukkue j ON p.Joukkue_id = j.Id";

        return dbQuery(query, []);
    },

    getPlayersByTeamId: (id) => {
        const params = [];
        params.push(id);

        const query = "SELECT p.Sukunimi AS 'Sukunimi', p.Etunimi AS 'Etunimi', p.Pelinumero AS " +
            "'Pelinumero', j.Nimi AS 'Joukkue' FROM pelaaja p JOIN joukkue j ON p.Joukkue_id = j.Id " +
            "WHERE Joukkue_id = ?";

        return dbQuery(query, params);
    }
};