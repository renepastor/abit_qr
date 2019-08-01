'use strict';
require('dotenv').config();
var express        = require('express');
const formidable   = require('formidable')
const format       = require('date-format');
var mv             = require('mv');
var router         = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('upload: ', Date.now());
  next();
});

router.post('/', function(req, res, next) {
  if (req.url == '/') {
     var form = new formidable.IncomingForm();
  }
  form.parse(req, function (err, fields, files) {
    var oldpath = files.miFile.path;
    var nombre = files.miFile.name;
    var dt = format.asString('yyyyMMddhhmmssSSS',new Date())+"_"+nombre.substring(-6);
    var newpath = './public/adj/' + dt;
    //fs.rename
    console.log("paso por aqui 33333");
    mv(oldpath, newpath, function (err) {
      if (err){
        throw err;
      }
      var json = JSON.stringify({"url":newpath.replace("/public",""), "name":nombre});
      res.end(json);
    });
  });
});
module.exports = router;