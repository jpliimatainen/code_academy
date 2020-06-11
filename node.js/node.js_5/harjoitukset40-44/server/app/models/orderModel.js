/*
 * Node.js
 * Tehtävät 36-44
 *
 * Juha-Pekka Liimatainen 11.1.2020
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

// creates an order row
const createOrderRow = (orderId, orderRow) => {
    const query = "INSERT INTO Tilausrivi(tuote, maara, yksikko, huomautus, verotonHinta, veroprosentti, toimitettu, tilausId) " +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

    return dbQuery(query, [...Object.values(orderRow), orderId]);
};

const getOrderData = orderId => {
    const query = "SELECT tilausnumero, DATE_FORMAT(tilauspvm, '%d.%m.%Y') as 'tilauspvm', " +
        "DATE_FORMAT(toimituspvm, '%d.%m.%Y') AS 'toimituspvm', asiakasId FROM Tilaus WHERE " +
        "tilausnumero = ?";

    return dbQuery(query, [orderId]);
};

const getOrderRows = async orders => {
    for (let i = 0; i < orders.length; i++) {
        const orderRows = await getOrderRowData(orders[i].tilausnumero);

        // insert order rows to the return array
        orders[i].tilausrivit = [];
        orders[i].tilausrivit.push(...orderRows);
    }

    return orders;
};

const getOrderRowData = orderId => {
    const query = "SELECT tilausriviId, tuote, maara, yksikko, huomautus, verotonHinta, veroprosentti, " +
        "toimitettu, tilausid FROM Tilausrivi WHERE tilausId = ?";

    return dbQuery(query, [orderId]);
};

module.exports = {

    createOrder: orderData => {
        const query = "INSERT INTO Tilaus(tilauspvm, toimituspvm, asiakasId) VALUES(?, ?, ?)";

        return dbQuery(query, orderData);
    },

    createOrderRows: async (orderId, orderRows) => {
        for (let i = 0; i < orderRows.length; i++) {
            // creates the i:th row for the order
            await createOrderRow(orderId, orderRows[i]);
        }
    },

    getOrderById: async orderId => {
        let order = await getOrderData(orderId);
        order = await getOrderRows(order);

        return order;
    },

    deleteRows: async orderId => {
        const query = "DELETE FROM Tilausrivi WHERE tilausId = ?";

        return dbQuery(query, [orderId]);
    }
};