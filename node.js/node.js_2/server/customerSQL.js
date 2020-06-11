/*
 * Node.js
 * Tehtävät 6-15
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 14.12.2019
*/

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminadmin',
    database: 'Customer',
    dateStrings: true
});

const createParamsArray = (data, id) => {
    const params = [];

    // insert fields in the right order
    params.push(data.NIMI);
    params.push(data.OSOITE);
    params.push(data.POSTINRO);
    params.push(data.POSTITMP);
    params.push(data.ASTY_AVAIN);
    params.push(parseInt(id));

    if ('MUUTOSPVM' in data) { // change date set
        params.push(data.MUUTOSPVM);
    }

    return params;
}

module.exports = {

    getTypes: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT AVAIN, LYHENNE, SELITE FROM asiakastyyppi";

            connection.query(query, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getCustomers: (name, address, type) => {
        return new Promise((resolve, reject) => {
            let params = [];

            let query = "SELECT a.AVAIN AS 'customerId', a.NIMI AS 'name', a.OSOITE AS 'address', " +
                "a.POSTINRO AS 'zipCode', a.POSTITMP AS 'town', DATE_FORMAT(a.LUONTIPVM, '%d.%m.%Y') " +
                "AS 'created', DATE_FORMAT(a.MUUTOSPVM, '%d.%m.%Y - %H:%i:%s') AS 'changed', at.SELITE " +
                "AS 'customerType', at.AVAIN AS 'typeId' FROM asiakas a JOIN asiakastyyppi at ON " +
                "a.ASTY_AVAIN = at.AVAIN WHERE 1=1 ";

            if (name !== null && name !== undefined && name !== '') {
                query += " AND UPPER(a.NIMI) like ?";
                params.push(name.toUpperCase() + '%');
            }

            if (address !== null && address !== undefined && address !== '') {
                query += " AND UPPER(a.OSOITE) like ?";
                params.push(address.toUpperCase() + '%');
            }

            if (type !== null && type !== undefined && type != 0) {
                query += " AND at.AVAIN = ?";
                params.push(type);
            }

            query += "ORDER BY a.AVAIN";

            connection.query(query, params, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getCustomerById: id => {
        return new Promise((resolve, reject) => {

            const query = "SELECT a.AVAIN AS 'customerId', a.NIMI AS 'name', a.OSOITE AS 'address', " +
                "a.POSTINRO AS 'zipCode', a.POSTITMP AS 'town', a.LUONTIPVM AS 'created', a.MUUTOSPVM " +
                "AS 'changed', at.SELITE AS 'customerType', at.AVAIN AS 'typeId' FROM asiakas a JOIN " +
                "asiakastyyppi at ON a.ASTY_AVAIN = at.AVAIN WHERE a.AVAIN = ?";

            connection.query(query, [id], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    newCustomer: (data) => {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT ";

            if (data.error) { // error flag set
                insertQuery = "INSERTX ";
            }

            insertQuery += " INTO asiakas(NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, " +
                "MUUTOSPVM, ASTY_AVAIN) VALUES(?, ?, ?, ?, CURDATE(), NOW(), ?)";

            connection.query(insertQuery, Object.values(data), function (error, insResult, fields) {
                if (error) {
                    reject(error);
                }
                else { // query about the inserted customer
                    const getQuery = "SELECT NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, MUUTOSPVM, " +
                        "ASTY_AVAIN FROM asiakas WHERE AVAIN = ?";

                    connection.query(getQuery, insResult.insertId, function (error, getResult, fields) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(getResult);
                        }
                    });
                }
            });
        });
    },

    removeCustomer: (id) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM asiakas WHERE AVAIN = ?";

            connection.query(query, id, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    updateCustomer: (data, id) => {
        return new Promise((resolve, reject) => {
            const params = createParamsArray(data, id);
            
            let updateQuery = "UPDATE asiakas SET NIMI = ?, OSOITE = ? , POSTINRO = ?, "
                + "POSTITMP = ?, MUUTOSPVM = NOW(), ASTY_AVAIN = ? WHERE AVAIN = ?";
            
            if (params.length === 7) { // change date set
                if (params[6] === null) { // change date is null
                    updateQuery += " AND MUUTOSPVM IS NULL";
                }
                else {
                    updateQuery += " AND MUUTOSPVM = ?";
                }
            }
            
            connection.query(updateQuery, params, function (error, updateResult, fields) {
                if (error) {
                    reject(error);
                }
                else { // query about the updated customer
                    const getQuery = "SELECT NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, MUUTOSPVM, " +
                        "ASTY_AVAIN FROM asiakas WHERE AVAIN = ?";
                    connection.query(getQuery, id, function (error, getResult, fields) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            // merge result objects
                            let resultObj = {};
                            resultObj = Object.assign(resultObj, updateResult, getResult);
                            resolve(resultObj);
                        }
                    });
                }
            });
        });
    }
};