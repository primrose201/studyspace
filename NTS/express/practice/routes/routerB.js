var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("hello! i'm routerB");
});

router.get('/about', function(req, res) {
    res.send("oh! my name is routerB");
});

module.exports = router;
