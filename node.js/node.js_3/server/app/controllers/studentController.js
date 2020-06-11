/*
 * Node.js
 * Tehtävät 16-26
 * 
 * Student REST API server
 *
 * Juha-Pekka Liimatainen 5.1.2020
*/

const address = require('../models/addressModel');
const post = require('../models/postModel');
const student = require('../models/studentModel');
const type = require('../models/typeModel');

const doFieldValidation = fields => {
    // required fields
    const required = ['etunimi', 'sukunimi', 'osoite', 'postinro', 'postitmp', 'tyyppi'];

    // test if required fields are missing
    const missingFields = checkMissingFields(required, Object.keys(fields));
    
    if (missingFields.length > 0) {
        return { status: "NOT OK", code: 1, msg: "Puuttuvat kentät:", fields: missingFields };
    }
    
    // test if required fields are empty
    const emptyFields = checkEmptyFields(fields);
    
    if (emptyFields.length > 0) {
        return { status: "NOT OK", code: 2, msg: "Tyhjät kentät:", fields: emptyFields };
    }

    // test if a valid zip code
    if (fields.postinro.length !== 5) {
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

const validTypeId = async typeid => {
    try {
        const result = await type.getById(typeid);

        if (result.length === 0 || result[0].status === 1) { // not a valid type 
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

const existingStudent = async (first, last) => {
    try {
        const result = await student.getByNameAndType(first, last);
        
        if (result.length > 0) { // an existing student found
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

const existingAddress = async osoite => {
    try {
        const result = await address.getByName(osoite);

        if (result.length > 0) { // an existing address found
            return result[0].idosoite; // return address id
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};

const existingPost = async zipcode => {
    try {
        const result = await post.getByZipCode(zipcode);

        if (result.length > 0) { // an existing post found
            return result[0].postinumero; // return existing zipcode
        }
        return '';
    }
    catch (err) {
        console.log(err);
        return '';
    }
};

module.exports = {

    fetchStudents: async (req, res) => {
        try {
            // query parameters
            const { etunimi, sukunimi, tyyppi, sort } = req.query;
            const students = await student.getByNameAndType(etunimi, sukunimi, tyyppi, sort);

            res.statusCode = 200;
            res.json({ status: "OK", msg: "", response: students })
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    createStudent: async (req, res) => {
        const validationData = doFieldValidation(req.body);

        if (validationData.status === 'NOT OK') { // field error(s)
            res.statusCode = 400;
            res.json(validationData);
            return;
        }
        
        const { etunimi, sukunimi, osoite, postinro, postitmp, tyyppi } = req.body;
        let result = null;

        try {
            // test if a valid typeId given
            const validType = await validTypeId(tyyppi);

            if (!validType) {
                res.statusCode = 400;
                res.json({ status: "NOT OK", code: 4, msg: "Virheellinen opiskelijatyyppi" });
                return;
            }

            // test if a student exists for the given name
            const studExists = await existingStudent(etunimi, sukunimi);

            if (studExists) {
                res.statusCode = 400;
                res.json({ status: "NOT OK", code: 5, msg: "Opiskelija on jo lisätty" });
                return;
            }

            // test if given address exists in db
            let addressId = await existingAddress(osoite);

            if (addressId === 0) {
                // create a new address
                result = await address.create(osoite);
                // get id of the created address
                addressId = result.insertId;
            }

            // test if given zipcode exists in db
            let zipcode = await existingPost(postinro);

            if (zipcode === '') {
                // create a new post
                result = await post.create(postinro, postitmp);
            }

            // create a student object
            const studentObj = {
                firstname: etunimi,
                lastname: sukunimi,
                address: addressId,
                zipcode: postinro,
                type: tyyppi,
            };

            // save student to the database
            result = await student.create(studentObj);

            // get id of the created student
            const studentId = result.insertId;

            // fetch the student
            result = await student.getById(studentId);

            res.statusCode = 201;
            res.json({ status: "OK", data: result[0] });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", code: 10, msg: "Tekninen virhe" });
        }
    }
};