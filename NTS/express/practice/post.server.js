var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.post('/post', function(req, res) {
    res.send('POST DATA : ' + req.body.content);
});

app.listen(8080, function() {
    console.log('web server started');
});