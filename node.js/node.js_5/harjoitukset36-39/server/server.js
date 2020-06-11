/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
*/

const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./app/routes/customerRoutes');
const orderRoutes = require('./app/routes/orderRoutes');

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
app.use(customerRoutes);
app.use(orderRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
