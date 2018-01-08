var express = require('express');

var app = express();

app.use(function(req, res) {
    res.send('<h1>hello world</h1>');
});

app.listen(8080, function() {
    console.log('web server started!');
});