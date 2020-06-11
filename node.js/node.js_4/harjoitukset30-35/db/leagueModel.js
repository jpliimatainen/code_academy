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
    getLeagueTable: () => {
        const query = "SELECT j.Nimi AS 'Nimi', j.Kaupunki AS 'Kaupunki', s.Ottelumaara AS 'Ottelut', " +
            "s.Voittoja AS 'Voitot', s.Tappioita AS 'Tappiot', s.Tasapeleja AS 'Tasapelit', s.Tehdyt_maalit, " +
            "s.Paastetyt_maalit, s.Pisteet FROM sarjataulukko s JOIN joukkue j ON s.Joukkue_id = j.Id ORDER BY s.Pisteet DESC";

        return dbQuery(query, []);
    }
};