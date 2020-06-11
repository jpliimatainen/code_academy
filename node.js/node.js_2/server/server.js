/*
 * Node.js
 * Tehtävät 6-15
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 14.12.2019
*/

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000;
const hostname = "127.0.0.1";

const cors = (req, res, next) =>    {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

const customerRoutes = require('./customerRoutes');
app.use(customerRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});