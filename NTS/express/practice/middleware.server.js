var express = require('express');
var app = express();

// set special middleware
app.use('/special', function(req, res, next) {
    console.log('welcome to special!');
    // http 요청을 종료하고 응답한다.
    res.end('special middleware!');
});

// middleware 1
app.use(function(req, res, next) {
    console.log('middle ware 1');
    res.end('middle ware 1');
    next();
});

// middleware 2
app.use(function(req, res, next) {
    console.log('middle ware 2');
    res.end('middle ware 2');
    next();
});

app.listen(8080, function() {
    console.log('web server started');
});