var express = require('express');
var http = require('http');
var port = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// server + listening port
server.listen(port);
console.log('Express server listening on port ' + port);
