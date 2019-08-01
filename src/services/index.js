'use strict';
require('dotenv').config();
const ActiveDirectory = require('activedirectory');
const axios = require('axios');



module.exports = function(req, res, next){
    var configLDAP = { url: process.env.HOST_LDAP,
      baseDN: process.env.HOST_LDAP_DN,
      username: 'rpmamani' + process.env.HOST_LDAP_DOMAIN_LOCAL,
      password: '&pmamani123zaq'
    };
  
  /*
  this.loginLDAP = function(){
    // ****** conexion con AD Activ Directori ******
    let configLDAP = { url: process.env.HOST_LDAP,
      baseDN: process.env.HOST_LDAP_DN,
      username: req.body.pUsuario + process.env.HOST_LDAP_DOMAIN_LOCAL,
      password: req.body.pClave
    }
    var ad = new ActiveDirectory(configLDAP);
    ad.findUser(configLDAP.username, function(err, user) {
      if (!user) {
        next();
      }else {
        var p =`mutation{
               auth(input:{pClave:"#$%&${req.body.pUsuario}#$%&",pUsuario:"${req.body.pUsuario}"}) {
               clientMutationId jwt
             }}`;
        axios({
          url: process.env.HOST_SERV + '/graphql',
          method:"post",
          data:{query:p}
        }).then(reg => {
          console.log("Token....", reg.data.data.auth.jwt);
          user.jwt = reg.data.data.auth.jwt;
          res.send(user);
        }).catch(err=>{console.log("Error3.....:",err);});
      }
    });
  };
  */
  this.loginLDAP = function(){
    // ****** conexion con AD Activ Directori ******
    var user = {sAMAccountName:"rpmamani",
                displayName: req.body.pUsuario, //:"Rene Pastor Mamani Flores"
                description:"GTIC"};
   
        var p =`mutation{
               auth(input:{pClave:"#$%&${req.body.pUsuario}#$%&",pUsuario:"${req.body.pUsuario}"}) {
               clientMutationId jwt
             }}`;
        axios({
          url: process.env.HOST_SERV + '/graphql',
          method:"post",
          data:{query:p}
        }).then(reg => {
          console.log("Token....", reg.data.data.auth.jwt);
          user.jwt = reg.data.data.auth.jwt;
          res.send(user);
        }).catch(err=>{console.log("Error3.....:",err);});
  };
  
  
  this.buscarLDAP = function(){
    
    var query = 'displayName=*'+req.query.user+'*';
    console.log(query);
    var ad = new ActiveDirectory(configLDAP);
    ad.findUsers(query, function(err, users) {
       if (err) {
         console.log('ERROR: ' +JSON.stringify(err));
         return;
       }
 
      if ((! users) || (users.length == 0)) next();
      else {
        //console.log('findUsers: '+JSON.stringify(users));
        res.send(users);
      }
    });
  }
  
}


/*
var q =`
  mutation{
    auth(input:{pClave:"${pClave}",pUsuario:"${pUsuario}"}) {
    clientMutationId jwt
  }}`;
  fnGql({query:q, action:function(res){
    if(res.data.auth.jwt != null){
      toastr.success("Bienvenido.. ","..");
      sessionStorage.token = res.data.auth.jwt;
      var q2 =`query{miUsuario{cuenta persId
        personaByPersId{primerNombre primerApellido}
        usrRolesByUserId{nodes{rolId permiso}}
      }}`;
      fnGql({query:q2, action:function(res){
        console.log(res);
        sessionStorage.sRolId = res.data.miUsuario.usrRolesByUserId.nodes[0].rolId;
        sessionStorage.userName = res.data.miUsuario.cuenta
        window.location = window.location.origin;
      }});
    }else{
      toastr.info("Ups! el usuario o contraseña es incorrecto","Aviso");
      $("#formLogin")[0].reset();
    }
  }});
*/
