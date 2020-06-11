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

    create: newStudent => {
        const insertQuery = "INSERT INTO student(etunimi, sukunimi, osoite_idosoite, " +
            "postinro, typeid) VALUES(?, ?, ?, ?, ?)";

        return dbQuery(insertQuery, Object.values(newStudent));
    },

    getByNameAndType: (firstname, lastname, type, sort) => {
        let params = [];
        let substr = '';

        let query = "SELECT s.id AS 'id', s.etunimi AS 'firstname', s.sukunimi AS 'lastname', o.lahiosoite AS 'address', " + 
            "p.postinumero AS 'zipcode', p.postitoimipaikka AS 'town', st.selite AS 'type' FROM student s JOIN osoite o " + 
            "ON s.osoite_idosoite = o.idosoite JOIN postinro p ON s.postinro = p.postinumero JOIN studentype st " + 
            "ON s.typeid = st.typeid WHERE 1 = 1";

        if (firstname !== null && firstname !== undefined && firstname !== '') {
            if (firstname.charAt(firstname.length - 1) === '*') { // the wildcard character included
                // removes the wildcard character
                substr = firstname.substr(0, firstname.length - 1);
                query += " AND UPPER(s.etunimi) like ?";
                params.push(substr.toUpperCase() + '%');
            }
            else { // use name as it is
                query += " AND UPPER(s.etunimi) = ?";
                params.push(firstname.toUpperCase());
            }
        }
        if (lastname !== null && lastname !== undefined && lastname !== '') {
            if (lastname.charAt(lastname.length - 1) === '*') { // the wildcard character included
                // removes the wildcard character
                substr = lastname.substr(0, lastname.length - 1);
                query += " AND UPPER(s.sukunimi) like ?";
                params.push(substr.toUpperCase() + '%');
            }
            else { // use name as it is
                query += " AND UPPER(s.sukunimi) = ?";
                params.push(lastname.toUpperCase());
            }
        }

        if (type !== null && type !== undefined) {
            query += " AND s.typeid = ?";
            params.push(type);
        }

        if (sort !== null && sort !== undefined && sort !== '') {
            query += " ORDER BY " + sort;
        }

        return dbQuery(query, params);
    },

    getById: id => {
        const params = [id];
        
        let query = "SELECT s.id AS 'id', s.etunimi AS 'firstname', s.sukunimi AS 'lastname', o.lahiosoite AS 'address', " + 
            "p.postinumero AS 'zipcode', p.postitoimipaikka AS 'town', st.selite AS 'type' FROM student s JOIN osoite o " + 
            "ON s.osoite_idosoite = o.idosoite JOIN postinro p ON s.postinro = p.postinumero JOIN studentype st " + 
            "ON s.typeid = st.typeid WHERE id = ?";

        return dbQuery(query, params);
    }
};