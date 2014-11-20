var connect = require('connect');
var http    = require('http');
var assert  = require('assert')
var request = require('supertest')

var serveStatic = require('serve-static')

var gaConnect = require('../');

var errorHandler = function errorHandler(err, req, res, next) {
    res.statusCode = 500;
    res.end(err.message);
};

var server = http.createServer();
var app = connect()
    .use(gaConnect('UA-test-123456'))
    .use('/public', serveStatic(__dirname + '/fixtures'))
    .use(errorHandler);

server.on('request', app);

request(server)
    .get('/public/test.html')
    .expect(/.*\<script\>.*/, console.log)
    .expect(/.*\'UA-test-123456\'.*/, console.log)
    .expect(200, console.log);
