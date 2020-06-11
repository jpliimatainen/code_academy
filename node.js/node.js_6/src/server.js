/*
 * Node.js
 * Tehtävät 45-48
 *
 * Juha-Pekka Liimatainen 16.1.2020
*/

const express = require('express');
const cons = require('consolidate');  // npm install consolidate
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // npm install express-session
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminadmin',
    database: 'mydb',
    dateStrings: true
});

const app = express();

// npm install handlebars
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Määritellään hostname ja portti
const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

//CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// Middleware: redirect anonymous user to the login page
const validateUser = (req, res, next) => {
    if (req.session.name === null || req.session.name === undefined) {
        return res.redirect('/login');
    }
    next();
}

// Session käyttö
app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'tosi_salainen_merkkijono ultra_secret', // 1. arvo -> käytetään kun hashataan data, muut arvot -> käytetään vertailuun onko data validia
    resave: false,
    saveUninitialized: true,
    name: 'JK_session_id'
}))

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async function (req, res) {
    const username = req.body.tunnus;
    const password = req.body.ss;

    const data = await getCustomerName(username, password);

    if (data.length > 0) {
        // store name of a customer
        req.session.name = data[0].nimi;
        // clear error message
        req.session.errMsg = null;

        return res.redirect('/news');
    }
    else {
        // pass message via a session variable
        req.session.errMsg = 'Virheellinen käyttäjätunnus tai salasana';
        // clear name
        req.session.name = null;

        return res.redirect('/login');
    }
});

app.get('/login', function (req, res) {
    if (req.session.name !== null && req.session.name !== undefined) {
        // redirect a logged in user to the home page
        return res.redirect('/');
    }
    else {
        res.render('login', {
            msg: req.session.errMsg,
        });
    }
});

app.get('/logout', validateUser, function (req, res) {
    // delete session
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/login');
        }
    })
});

app.get('/', validateUser, function (req, res) {
    const msg = 'Tervetuloa sovellukseen X. Tämä on pääsivu.'

    res.render('index', {
        message: msg,
        logoutName: req.session.name,
    });
});

app.get('/news', validateUser, function (req, res) {
    res.render('news', {
        logoutName: req.session.name,
    });
});

// match all protocols and routes
app.all(/\/.+/, function (req, res) {
    // get the path user entered
    const invalidPath = req.originalUrl;
    let rd = { path: '/login', text: 'Kirjautumissivulle' };

    if (req.session.name !== null && req.session.name !== undefined) {
        // redirect a logged in user to the home page
        rd.path = '/';
        rd.text = 'Etusivulle';
    }

    res.render('not-found', {
        invalidPath: invalidPath,
        redirect: rd,
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});

// return customer name for a given username-password combination
const getCustomerName = async (username, password) => {
    try {
        const result = await getCustomer(username, password);

        return result;
    }
    catch (err) {
        console.log(err);
    }
};

const getCustomer = (username, password) => {
    const params = [username, password];

    return new Promise((resolve, reject) => {
        const query = "SELECT nimi FROM Asiakas WHERE tunnus = ? AND salasana = ?";

        connection.query(query, params, function (error, result, fields) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};