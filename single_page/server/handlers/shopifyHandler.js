const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use('/proxy/checkout/initialize', function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/proxy/checkout/initialize', function (req, res) {
  res.send('checkout proxy page');
});

router.get('/checkout', function (req, res) {
  res.send('checkout homepage');
});

module.exports = router;
