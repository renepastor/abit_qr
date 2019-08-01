var express                = require('express');
var router                 = express.Router();


const services             = require('./services');


router.post('/login', function(req, res, next) {
  // ******** login de YPFB   *******
  var log = new services(req, res, next);
  log.loginLDAP();
});

router.get('/buscar', function(req, res, next) {
  // ******** login de YPFB   *******
  var log = new services(req, res, next);
  log.buscarLDAP();
});




module.exports = router;