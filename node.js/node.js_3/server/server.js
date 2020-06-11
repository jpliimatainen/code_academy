/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./app/routes/postRoutes');
const studentRoutes = require('./app/routes/studentRoutes');
const typeRoutes = require('./app/routes/typeRoutes');

const port = 3000;
const hostname = "127.0.0.1";

const cors = (req, res, next) =>    {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

const app = express();
app.use(bodyParser.json());
app.use(cors);
app.use(postRoutes);
app.use(studentRoutes);
app.use(typeRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});