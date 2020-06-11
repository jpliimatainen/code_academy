/*
 * Node.js
 * Tehtävät 27-35
 * 
 * Handlebars
 *
 * Juha-Pekka Liimatainen 7.1.2020
*/

const express = require('express');
const cons = require('consolidate');
const app = express();
const path = require('path');
const eventSql = require('./db/eventModel');

const port = 3000;
const hostname = "127.0.0.1";

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static('views')); // css files


app.get('/', (req, res) => {
    let options = [];

    options.push({id: 0, text: 'Choose...'});
    options.push({id: 1, text: 'Option 1'});
    options.push({id: 2, text: 'Option 2'});
    options.push({id: 3, text: 'Option 3'});
    options.push({id: 4, text: 'Option 4'});
    options.push({id: 5, text: 'Option 5'});

    let links = [];

    links.push({target: '#', text: 'League table'});
    links.push({target: '#', text: 'Players and teams'});

    const middleText = 'Click one of the links on the left';
    const footerText = 'Contact information';
    
    res.render('index', {
        options: options,
        links: links,
        middleText: middleText,
        footerText: footerText,
    });
});

app.get('/events', async (req, res) =>  {

    let eventItems = [];

    try{        
        eventItems = await eventSql.getUpcomingEvents();
        console.log("events:", eventItems);
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }

    res.render('events', {
        eventItems: eventItems,
    });        
});

app.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}/`);
});