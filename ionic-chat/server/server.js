const express = require('express');
const app = express();

const http = require('http');
const port = 3030;

app.get('/', function (req, res) {
    res.send('hi server');
});

let server = http.createServer(app);

server.listen(port);
server.on('listening', () => {
    console.log(`server listening on port: ${port}`)
})
server.on('error', () => { })