/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const post = require('../models/postModel');

module.exports = {

    fetchPosts: async (req, res) => {
        try {
            const posts = await post.getAll();

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: posts })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    }
};