/*
 * Node.js
 * Tehtävät 6-15
 * 
 * REST API server
 *
 * Juha-Pekka Liimatainen 14.12.2019
*/

const sql = require('./customerSQL');

const doFieldValidation = fields => {
    // required fields
    const felds = ['NIMI', 'OSOITE', 'POSTINRO', 'POSTITMP', 'ASTY_AVAIN'];

    // test if required fields are missing
    const missingFields = checkMissingFields(felds, Object.keys(fields));

    if (missingFields.length > 0) {
        return { status: "NOT OK", code: 1, msg: "Puuttuvat kentät:", fields: missingFields };
    }

    // test if required fields are empty
    const emptyFields = checkEmptyFields(fields);

    if (emptyFields.length > 0) {
        return { status: "NOT OK", code: 2, msg: "Tyhjät kentät:", fields: emptyFields };
    }

    // test if a valid zip code
    if (fields.POSTINRO.length !== 5) {
        return { status: "NOT OK", code: 3, msg: "Postinumero pitää olla tasan 5 merkkiä" };
    }

    // no errors
    return { status: "OK" };
}

const checkMissingFields = (required, input) => {
    let missingFields = [];
    required.forEach(checkValue);

    function checkValue(value, index, array) {
        if (input.indexOf(value) === -1) {
            // value not found in the input array; add as a missing field
            missingFields.push(value);
        }
    }

    return missingFields;
};

const checkEmptyFields = input => {
    let emptyFields = [];

    for (const property in input) {
        if (property === 'error') {
            continue;
        }
        if (input[property] === '' || input[property] == 0) {
            emptyFields.push(property);
        }
    }

    return emptyFields;
};

module.exports = {

    fetchTypes: async (req, res) => {
        try {
            const customerTypes = await sql.getTypes();
            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: customerTypes })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchCustomers: async (req, res) => {
        try {
            // query parameters
            const { name, address, type } = req.query;
            const customers = await sql.getCustomers(name, address, type);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: customers })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchCustomer: async (req, res) => {
        try {
            // customer id
            const id = req.params.id;
            const customer = await sql.getCustomerById(id);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: customer })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    createCustomer: async (req, res) => {
        const validationData = doFieldValidation(req.body);

        if (validationData.status === 'NOT OK') { // field error(s)
            res.statusCode = 400;
            res.json(validationData);
            return;
        }

        try {
            const result = await sql.newCustomer(req.body);

            res.statusCode = 201;
            res.json({ status: "OK", data: result });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", code: 4, msg: "Tekninen virhe" });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            // customer id
            const id = req.params.id;

            const result = await sql.removeCustomer(id);

            if (result.affectedRows === 0) { // no customer deleted
                res.statusCode = 404;
                res.json({ status: "NOT OK", msg: "Virheellinen asiakasId" });
                return;
            }

            res.statusCode = 204;
            res.end(); // returns nothing
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tekninen virhe" });
        }
    },

    editCustomer: async (req, res) => {
        const validationData = doFieldValidation(req.body);

        if (validationData.status === 'NOT OK') { // field error(s)
            res.statusCode = 400;
            res.json(validationData);
            return;
        }

        try {
            // customer id
            const id = req.params.id;

            const result = await sql.updateCustomer(req.body, id);
            
            if (result.affectedRows === 0) { // no customer updated
                res.statusCode = 404;
                res.json({ status: "NOT OK", code: 5, msg: "Virheellinen aikaleima tai asiakasId" });
                return;
            }

            // return 200 instead of 204 so that we can return the result data
            res.statusCode = 200;
            res.json({ status: "OK", data: result });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", code: 4, msg: "Tekninen virhe" });
        }
    }
};