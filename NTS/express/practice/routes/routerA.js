var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("hello! i'm routerA");
});

router.get('/about', function(req, res) {
    res.send("oh! my name is routerA");
});

module.exports = router;
