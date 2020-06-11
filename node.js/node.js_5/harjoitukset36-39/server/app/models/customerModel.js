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

const getOrderData = customerId => {
    const query = "SELECT t.asiakasId AS 'asiakasId', t.tilausnumero AS 'tilausnumero', DATE_FORMAT(" + 
        "t.tilauspvm, '%d.%m.%Y') as 'tilauspvm', DATE_FORMAT(t.toimituspvm, '%d.%m.%Y') AS 'toimituspvm', " + 
        "round(sum(tr.maara * tr.verotonHinta), 2) AS 'verotonYht', round(sum(tr.maara * tr.verotonHinta * " + 
        "(tr.veroprosentti + 1)), 2) AS 'verollinenYht' FROM Tilaus t LEFT JOIN Tilausrivi tr ON t.tilausnumero " + 
        "= tr.tilausId WHERE t.asiakasId = ? GROUP BY t.tilausnumero";

    return dbQuery(query, [customerId]);
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
        "toimitettu, tilausid, round((maara * verotonHinta), 2) AS 'verotonYht', round(maara * verotonHinta " + 
        "* (veroprosentti + 1), 2) AS 'verollinenYht' FROM Tilausrivi WHERE tilausId = ?";

    return dbQuery(query, [orderId]);
};

module.exports = {

    getCustomersData: status => {
        let params = [];

        let query = "SELECT a.asiakasId AS 'asiakasId', a.nimi AS 'nimi', a.kayntiosoite AS 'kayntiosoite', " +
            "a.postinumero AS 'postinumero', a.postitoimipaikka AS 'postitoimipaikka', a.status AS 'status', " +
            "count(distinct t.tilausnumero) AS 'tilaukset', round(sum(tr.maara * tr.verotonHinta * (tr.veroprosentti " + 
            "+ 1)), 2) AS 'yhteissumma' FROM Asiakas a LEFT JOIN Tilaus t ON a.asiakasId = t.asiakasId LEFT " + 
            "JOIN Tilausrivi tr ON t.tilausnumero = tr.tilausId";

        if (status !== null && status !== undefined) {
            query += " WHERE a.status = ?";
            params.push(status);
        }

        query += " GROUP BY a.asiakasId";

        return dbQuery(query, params);
    },

    getCustomerData: async customerId => {
        let orders = await getOrderData(customerId);
        orders = await getOrderRows(orders);

        return orders;
    },

    getIdsOfOrderItems: async (customerId, status) => {
        let params = [];
        let query = '';

        if (customerId !== null && customerId !== undefined && status !== null && status !== undefined) {
            query = "SELECT tilausriviId FROM Tilausrivi WHERE toimitettu = ? AND tilausId IN " +
                "(SELECT tilausnumero FROM Tilaus WHERE asiakasId = ?)";

            params.push(status);
            params.push(customerId);
        }
        else if (customerId !== null && customerId !== undefined) {
            query = "SELECT tilausriviId FROM Tilausrivi WHERE tilausId IN " +
                "(SELECT tilausnumero FROM Tilaus WHERE asiakasId = ?)";

            params.push(customerId);
        }
        else if (status !== null && status !== undefined) {
            query = "SELECT tilausriviId FROM Tilausrivi WHERE toimitettu = ?";

            params.push(status);
        }

        return dbQuery(query, params);
    },

    getIdsOfOrders: async (customerId) => {
        const query = "SELECT tilausnumero FROM Tilaus WHERE asiakasId = ?";

        return dbQuery(query, [customerId]);
    },

    removeOrderRows: async orderRowIds => {
        const params = [];
        params.push(orderRowIds);
        
        const query = "DELETE FROM Tilausrivi WHERE tilausriviId IN (?)";

        return dbQuery(query, params);
    },

    removeOrders: async orderIds => {
        const params = [];
        params.push(orderIds);

        const query = "DELETE FROM Tilaus WHERE tilausnumero IN (?)";

        return dbQuery(query, params);
    },

    removeCustomer: async customerId => {
        const query = "DELETE FROM Asiakas WHERE asiakasId = ?";

        return dbQuery(query, [customerId]);
    }
};
