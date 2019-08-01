;(function($) {	
  /**Modulos***/
  var mod = $.sammy('#pnlBody', function() {
    this.debug = true;
    var vw = "tpls";
    var db_loaded = false;
    this.before(function() {
      if (!db_loaded) {
        if(!sessionStorage.token){
          this.partial(vw+'/home.html');
          return false;
        }else{
          if(location.hash.substring(1)=="login") this.redirect('#index');
          else this.partial(vw+'/#'+location.hash.substring(1));
          $("#modTitle").html(slGet("modTitle"));
          return true;
        }
        this.app.swap("Verificamos session");
        return true;
      }
    });
    this.get('#index',                 function(){this.partial(vw+'/index.html');});
    this.get('/',                 function(){this.partial(vw+'/home.html');});
    this.get('#login',            function(){this.partial(vw+'/login.html');});
    this.get('#home',             function(){this.partial(vw+'/home.html');});
    this.get('#salir',            function(){this.partial(vw+'/salir.html');});
    
    this.get('#tblTipos',         function(){this.partial(vw+'/tblTipos/index.html');});
    this.get('#parametros',       function(){this.partial(vw+'/parametros/index.html');});
    
    this.get('#usuario',          function(){this.partial(vw+'/usuarios/index.html');});
    this.get('#roles',            function(){this.partial(vw+'/roles/index.html');});
    this.get('#accesos',          function(){this.partial(vw+'/menues/index.html');});
    
    this.get('#rrhhUsuario',          function(){this.partial(vw+'/usuarios/RRHHUsuario.html');});
    //this.get('#persona',          function(){this.partial(vw+'/personas/index.html');});
    this.get('#persona',          function(){this.partial(vw+'/rrhhYpfb/index.html');});
    this.get('#boletasPago',      function(){this.partial(vw+'/pagos/boletaPago.html');});
    
    this.get('#adminFeriados',    function(){this.partial(vw+'/feriados/index.html');});
    this.get('#adminResponsables',function(){this.partial(vw+'/designacionResponsables/index.html');});
    this.get('#solVacacion',      function(){this.partial(vw+'/detallePermisoVacacion/index.html');});
    this.get('#adminVacacion',    function(){this.partial(vw+'/detallePermisoVacacion/adminIndex.html');});
    this.get('#progVacaciones',   function(){this.partial(vw+'/vacacionesProgramadas/index.html');});
    
    this.get('#docPersonal',      function(){this.partial(vw+'/documentosPersonal/index.html');});
    this.get('#repDocumentosRRHH',function(){this.partial(vw+'/documentosPersonal/reporteGeneral.html');});
    
    this.get('#asistMarcado',         function(){this.partial(vw+'/home/index.html');});
    
    /*
    this.get('#generador',        function(){this.partial(vw+'/generador/index.html');});
    this.get('#report',           function(){this.partial(vw+'/crud/index.html');});
    
    this.get('#editClave',        function(){this.partial(vw+'/usuarios/editClave.html');});
    
    this.get('#tramiteNew',       function(){this.partial(vw+'/tramites/new.html');});
    this.get('#tramiteSegui',     function(){this.partial(vw+'/tramites/seguimiento.html');});
    
    this.get('#rrHhPoa',          function(){this.partial(vw+'/rrhh/rrHhPoa.html');});

    this.get('#personaNew',       function(){this.partial(vw+'/personas/new.html');});
    this.get('#personaView',      function(){this.partial(vw+'/personas/view.html');});
    
    
    this.get('#contrato',         function(){this.partial(vw+'/personal/index.html');});
    this.get('#personalYpfb',     function(){this.partial(vw+'/rrhhYpfb/index.html');});
    this.get('#cas',              function(){this.partial(vw+'/casPrecentados/index.html');});
    this.get('#repoJefeUnidad',   function(){this.partial(vw+'/vacacionesProgramadas/programacionUnidad.html');});
    

    this.get('#rhIncorporar',     function(){this.partial(vw+'/rrhh/incorporar.html');});

    this.get('#riesgoOperNew',    function(){this.partial(vw+'/riesgosOperativos/new.html');});
    this.get('#riesgoOperView',   function(){this.partial(vw+'/riesgosOperativos/view.html');});
    this.get('#riesgoOper',       function(){this.partial(vw+'/riesgosOperativos/list.html');});
    this.get('#tramiteROSeg',     function(){this.partial(vw+'/riesgosOperativos/new.html');});
    
    this.get('#atecionClienteNew',    function(){this.partial(vw+'/atencionClientes/add.html');});
    this.get('#atenClieUsuariosEdit', function(){this.partial(vw+'/programacionUsuarios/edit.html');});
    this.get('#atencionClienteEdit',  function(){this.partial(vw+'/atencionClientes/list.html');});
    this.get('#tramiteACSeg',         function(){this.partial(vw+'/atencionClientes/add.html');});
    
    this.get('#inventarios',      function(){this.partial(vw+'/inv/index.html');});
    this.get('#unidadMedida',     function(){this.partial(vw+'/unidadesMedida/index.html');});
    this.get('#proveedores',      function(){this.partial(vw+'/proveedores/index.html');});
    this.get('#clientes',         function(){this.partial(vw+'/clientes/index.html');});
    this.get('#productos',        function(){this.partial(vw+'/productos/index.html');});
    
    this.get('#ofertas',          function(){this.partial(vw+'/ofertas/index.html');});
    this.get('#rubros',           function(){this.partial(vw+'/ofertasRubros/index.html');});
    this.get('#invNewTram',       function(){this.partial(vw+'/inv/#invNewTram.html');});
    
    this.get('#permisos',         function(){this.partial(vw+'/examen/index.html');});
    
    */
    this.get('#esProducto',       function(){this.partial(vw+'/eessProductos/index.html');});
    this.get('#esTanque',         function(){this.partial(vw+'/eessTanques/index.html');});
    this.get('#eessAdmin',        function(){this.partial(vw+'/estacionesServicio/indexAdmin.html');});
    this.get('#eess',             function(){this.partial(vw+'/estacionesServicio/index.html');});
    this.get('#esVolumenes',      function(){this.partial(vw+'/eessRegistroVolumenes/index.html');});
    this.get('#esUsuario',        function(){this.partial(vw+'/usuarios/EESSUsuario.html');});
    this.get('#repoEess',         function(){this.partial(vw+'/reportes/eess/index.html');});
    this.get('#repoEessAlert',    function(){this.partial(vw+'/reportes/eess/nacional.html');});
    //this.get('#repoEessPP',         function(){this.partial(vw+'/reportes/eess/index_p.html');});
    this.get('#ambientes',        function(){this.partial(vw+'/ambientes/index.html');});
    this.get('#domReporte',       function(){this.partial(vw+'/ambientes/reporte.html');});
    /**QR*/
    this.get('#qr',               function(){this.partial(vw+'/home/reporteQR.html');});
    this.get('#fichaPersonal',    function(){this.partial(vw+'/fichaPersonal/index.html');});
    this.get('#fichaMascota',     function(){this.partial(vw+'/fichaMascotas/index.html');});
  });

  $(function(){
    if(sessionStorage.token){
      mod.run('#home');
    }else{
      mod.run('#home');
    }
  });
})(jQuery);