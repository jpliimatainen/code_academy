/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
*/

const order = require('../models/orderModel');

module.exports = {

    createOrder: async (req, res) => {
        // get data for an order
        const { tilauspvm, toimituspvm, asiakasId, tilausrivit } = req.body;
        const orderData = [tilauspvm, toimituspvm, asiakasId];
        
        try {
            // create a new order
            let result = await order.createOrder(orderData);

            // get id of the created order
            const tilausnumero = result.insertId;

            // insert rows to the order
            await order.createOrderRows(tilausnumero, tilausrivit);

            // load complete order
            result = await order.getOrderById(tilausnumero);

            res.statusCode = 201;
            res.json({ status: "OK", data: result });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tekninen virhe" });
        }
    }
};