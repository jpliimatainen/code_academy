/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
*/

const customer = require('../models/customerModel');

module.exports = {

    fetchCustomersData: async (req, res) => {
        try {
            // query parameter (status = 0 (active))
            const { status } = req.query;
            const customersData = await customer.getCustomersData(status);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: customersData })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchCustomerData: async (req, res) => {
        try {
            // get customer id
            const { id } = req.params;
            const customerData = await customer.getCustomerData(id);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: customerData });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            // customer id
            const customerId = req.params.id;

            // get the ids of shipped items for this customer
            let result = await customer.getIdsOfOrderItems(customerId, 1);

            if (result.length > 0) {
                res.statusCode = 404;
                res.json({ status: "NOT OK", msg: "Asiakasta ei voi poistaa, koska on toimitettuja tilauksia." });
                return;
            }

            // get the ids of all order items for this customer
            result = await customer.getIdsOfOrderItems(customerId);

            if (result.length > 0) {
                const orderRowIds = [];

                for (let i = 0; i < result.length; i++) {
                    orderRowIds.push(result[i].tilausriviId);
                }

                // remove order rows first
                result = await customer.removeOrderRows(orderRowIds);
            }

            // get the ids of all orders for this customer
            result = await customer.getIdsOfOrders(customerId);

            if (result.length > 0) {
                const orderIds = [];

                for (let i = 0; i < result.length; i++) {
                    orderIds.push(result[i].tilausnumero);
                }

                // then remove orders
                result = await customer.removeOrders(orderIds);
            }

            // finally remove the customer
            result = customer.removeCustomer(customerId);

            if (result.affectedRows === 0) {
                res.statusCode = 400;
                res.json({ status: "NOT OK", msg: "Virhe asiakkaan poistossa." });
            }
            else { // success
                res.statusCode = 200;
                res.json({ status: "OK", msg: "Asiakas poistettu onnistuneesti." });
            }
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tekninen virhe" });
        }
    },
};
