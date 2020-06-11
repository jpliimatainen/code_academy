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
const morgan = require('morgan');

app.use(morgan('[:date] :method:url - :response-time ms'));

const eventSql = require('./db/eventModel');
const leagueSql = require('./db/leagueModel');
const playerSql = require('./db/playerModel');
const teamSql = require('./db/teamModel');

const port = 3000;
const hostname = "127.0.0.1";

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static('views')); // css files

const routes = ['/', '/events', '/league', '/players-teams', '/teams/:id', '/about'];
app.use(routes, function(req, res, next) {
    const date = new Date();
    // apply a custom header
    res.set('customHeader', 'You called my node on ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' 
        + date.getFullYear() + ' at ' + date.getHours() + '.' + date.getMinutes());
    next();
})


app.get('/', (req, res) => {
    // log request url
    console.log("Path: ", req.url);

    let options = [];

    options.push({id: 0, text: 'Choose...'});
    options.push({id: 1, text: 'Option 1'});
    options.push({id: 2, text: 'Option 2'});
    options.push({id: 3, text: 'Option 3'});
    options.push({id: 4, text: 'Option 4'});
    options.push({id: 5, text: 'Option 5'});

    let links = [];

    links.push({id: 'league', target: '#', text: 'League table'});
    links.push({id: 'teams', target: '#', text: 'Players and teams'});
    links.push({id: 'about', target: '#', text: 'About Players'});

    const middleText = 'Click one of the links on the left';
    const footerText = 'Contact information';
    console.log(res);
    res.render('index', {
        options: options,
        links: links,
        middleText: middleText,
        footerText: footerText,
    });
});

app.get('/events', async (req, res) =>  {
    // log request url
    console.log("Path: ", req.url);

    let eventItems = [];

    try{        
        eventItems = await eventSql.getUpcomingEvents();
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }
    console.log(res);
    res.render('events', {
        eventItems: eventItems,
    });        
});

app.get('/league', async (req, res) =>  {
    // log request url
    console.log("Path: ", req.url);

    let stats = [];

    try{        
        stats = await leagueSql.getLeagueTable();
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }
    console.log(res);
    res.render('league', {
        stats: stats,
    });        
});

app.get('/players-teams', async (req, res) =>  {
    // log request url
    console.log("Path: ", req.url);

    let players = [];
    let teams = [];

    try{        
        players = await playerSql.getPlayers();
        teams = await teamSql.getTeams();
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }
    console.log(res);
    res.render('players-teams', {
        players: players,
        teams: teams,
    });        
});

app.get('/teams/:id', async (req, res) =>  {
    // log request url
    console.log("Path: ", req.url);

    const id = req.params.id;
    let players = [];

    try{        
        players = await playerSql.getPlayersByTeamId(id);
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }
    console.log(res);
    res.render('teams', {
        players: players,
    });        
});

app.get('/about', async (req, res) =>  {
    // log request url
    console.log("Path: ", req.url);

    let teams = [];

    try{        
        teams = await teamSql.getTeams();
    }
    catch(e)
    {
        console.log("ERROR: ", e)
    }
    console.log(res);
    res.render('about', {
        teams: teams,
    });        
});

app.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}/`);
});