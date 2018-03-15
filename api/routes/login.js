const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  res.send('api work');
});

module.exports = router;
