/*
 * Node.js
 * Tehtävät 1-5
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 9.12.2019
*/

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminadmin',
    database: 'Customer',
    dateStrings: true
});

module.exports = {

    fetchTypes: (req, res) => {
        const query = "SELECT AVAIN AS 'typeId', LYHENNE AS 'abbr', SELITE AS 'description' " +
            "FROM asiakastyyppi";

        connection.query(query, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                res.statusCode = 200;
                res.json({ status: "NOT OK", msg: "Tekninen virhe!" });
            }
            else {
                res.statusCode = 200;
                res.json({ status: "OK", msg: "", response: result })
            }
        });

    },

    fetchCustomers: (req, res) => {
        let params = [];

        let query = "SELECT a.AVAIN AS 'customerId', a.NIMI AS 'name', a.OSOITE AS 'address', " +
            "a.POSTINRO AS 'zipCode', a.POSTITMP AS 'town', DATE_FORMAT(a.LUONTIPVM, '%d.%m.%Y') " +
            "AS 'created', at.SELITE AS 'customerType', at.AVAIN AS 'typeId' FROM asiakas a JOIN " +
            "asiakastyyppi at ON a.ASTY_AVAIN = at.AVAIN WHERE 1=1 ";

        if (req.query.name != null) {
            query += " AND UPPER(a.NIMI) like ?";
            params.push(req.query.name.toUpperCase() + '%');
        }

        if (req.query.address != null) {
            query += " AND UPPER(a.OSOITE) like ?";
            params.push(req.query.address.toUpperCase() + '%');
        }

        if (req.query.type != null) {
            query += " AND at.AVAIN = ?";
            params.push(req.query.type);
        }

        console.log("query:" + query);

        connection.query(query, params, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                res.statusCode = 200;
                res.json({ status: "NOT OK", msg: "Tekninen virhe!" });
            }
            else {
                res.statusCode = 200;
                res.json({ status: "OK", msg: "", response: result })
            }
        });
    },

    create: (req, res) => {

        console.log("CREATE: ", req.body);

        let q = "INSERT INTO asiakastyyppi (LYHENNE, SELITE) VALUES(?, ?)";

        console.log("query:" + q);
        connection.query(q, [req.body.lyhenne, req.body.selite], function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                res.statusCode = 400;   // 400, 500
                res.json({ status: "NOT OK", msg: "Tekninen virhe" });
            }
            else {
                res.statusCode = 201;
                console.log("RESULT:", result);
                res.json({ avain: result.insertId, lyhenne: req.body.lyhenne, selite: req.body.selite })
            }
        });
    },

    updateType: (req, res) => {

        console.log("UPDATE: ", req.body);
        console.log("params: ", req.params);

        let q = "UPDATE asiakastyyppi set LYHENNE = ?, SELITE = ? WHERE AVAIN = ?";

        console.log("query:" + q);
        if (req.body.lyhenne == null) {
            console.log("Lyhenne kenttÃ¤ oli tyhjÃ¤");
        }

        connection.query(q, [req.body.lyhenne, req.body.selite, req.params.avain], function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                res.statusCode = 400;   // 400, 500
                res.json({ status: "NOT OK", msg: "Tekninen virhe" });
            }
            else {
                res.statusCode = 204;
                console.log("RESULT:", result);
                res.json()
            }
        });
    },

    deleteType: function (req, res) {


        console.log("DELETE params: ", req.params);

        let q = "DELETE FROM asiakastyyppi WHERE AVAIN = ?";

        console.log("query:" + q);

        connection.query(q, [req.params.avain], function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                res.statusCode = 400;   // 400, 500
                res.json({ status: "NOT OK", msg: "Tekninen virhe" });
            }
            else {
                res.statusCode = 204;
                console.log("RESULT:", result);
                res.json()
            }
        });
    }
}