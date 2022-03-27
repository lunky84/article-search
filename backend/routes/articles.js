var express = require('express');
var router = express.Router();
const searchIndex = require('../searchIndex')

router.get('/', function(req, res, next) {
  const q = req.query.q;
    res.json(searchIndex.searchIndex(q))
});

module.exports = router
