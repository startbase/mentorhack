const express = require('express');
const app = express();
const server = require('http').createServer(app);

"use strict";

//app.use(express.static(__dirname + '/public'));
//app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/samples',  express.static(__dirname + '/samples'));

app.get('/', (req, res) => {
    res.send('status 200');
    res.status(200).end();
});

app.post('/upload', (req, res) => {

});

app.use((req, res) => {
    res.status(404);
    res.send('404. Page does not exist');
});

server.listen(3021, '127.0.0.1');
