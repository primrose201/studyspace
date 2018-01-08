var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/ejs', function(req, res) {
    // server side rendering data 는 다음과 같이 object 형식으로 넘겨준다.
    res.render('index', {title: 'Ejs', message: "hello i'm ejs"});
});

app.get('/pug', function(req, res) {
    res.render('index', {title: 'Pug', message: "hello i'm pug"});
});

app.listen(8080, function() {
    console.log('web server started');
});