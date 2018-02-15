'use strict';
const express = require('express');
const http = require('http');
const hbs  = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);

let port = process.env.port || 3000;
let host = process.env.host || '192.168.35.10';

if (port === false || host === false) {
    console.log('error conf');
    process.exit(-1);
}

app.use('/samples',  express.static(__dirname + '/samples'));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: path.join(__dirname, '/views/layouts/main')}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.render('dashboard', {
        host: 'http://' + host,
    });
});

app.get('/metrics', (req, res) => {
    res.render('dashboard', {
        host: 'http://' + host,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('404. Page does not exist');
});

server.listen(port, host, function() {
    console.log('start host: '+ host + ' port: ' + port);
});

