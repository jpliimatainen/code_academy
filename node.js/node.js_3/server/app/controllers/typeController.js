/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const type = require('../models/typeModel');

module.exports = {

    fetchTypes: async (req, res) => {
        try {
            // query parameter
            const { status } = req.query;
            const types = await type.getByStatus(status);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: types })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    }
};