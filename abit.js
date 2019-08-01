'use strict';
require('dotenv').config();
const express         = require('express');
const fs              = require('fs');
const https           = require('https');
const app             = express();
const http            = require('http').Server(app);
const formidable      = require('formidable')
const bodyParser      = require('body-parser');
const postgraphql     = require('postgraphile').postgraphql;
const format          = require('date-format');
const axios           = require('axios');
const src             = require('./src/');
const upload          = require('./src/services/upload');
const ActiveDirectory = require('activedirectory');

//var mv = require('mv');
//const fs = require('fs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); //false


// ****** ACCESOS A DOMINIOS CRUSADOS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//*** Accediendo a Archivos del de la vista
app.use('/', express.static(__dirname + '/public/'));

// ******* SERVISIOS EN NODE
app.use('/src', src);
app.use('/upload', upload);

// *******  ACCESOS A POSTGRAPHILE
const postgresConfig = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE
}

app.use(postgraphql(
  postgresConfig,
  process.env.POSTGRAPHQL_SCHEMA, {
    graphiql: true,
    watchPg: false,
    enableCors: true,
    jwtPgTypeIdentifier: `${process.env.POSTGRAPHQL_SCHEMA}.jwt`,
    jwtSecret: process.env.JWT_SECRET,
    pgDefaultRole: process.env.POSTGRAPHQL_DEFAULT_ROLE
    //,bodySizeLimit:'200kB'
    //,timeout: 5000
  }))

var io = require('socket.io')(http);
/////// SOCKET IO
io.on('connection', function (socket) {
  //socket.emit('reseptor', { hello: 'world' });
  socket.on('eessMinimo',function (data) {
    io.emit('eessMinimo', data);
    console.log('eessMinimo', data);
  });
});


// ***** MOSTRAR ERRO SI NO EXISTE URL
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ***** VERIFICAR EMBIENTE *****
app.use(function (err, req, res, next) {
  res.send(' ', err.message, ' ', (req.app.get('env') === 'development' ? err : {}));
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:'+process.env.PORT);
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})
