var express = require('express');

var app = express();

app.get('/a', function(req, res) {
    res.send('<a href="/b">go to B</a>');
});

app.get('/b', function(req, res) {
    res.send('<a href="/a">go to A</a>');
});

app.get('/page', function(req, res) {
   res.send(req.query.name + '님 안녕하세요!');
});

app.get('/page/:name', function(req, res) {
    res.send(req.params.name + '님 환영합니다!');
});


app.use('/routeA', require('./routes/routerA'));
app.use('/routeB', require('./routes/routerB'));

app.listen(8080, function() {
    console.log('web server started');
});