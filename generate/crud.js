//var readline = require('readline-sync');
//var nameTable = readline.question("ingrese el nombre de la tabla?");
var nameTable = process.argv[2];
//var reg = `<!-- Aut: renepastor@gmail.com, fecha:${fnFechaActual()} -->`;
//var axios = require('axios');
var fs = require('fs');
const listColumnas = [];
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'bd_abit',
  password: '',
  port: 5432,
});

let _tbl = nameTable;

let _phat = "./temp/";

var dir = _phat + toCamelCase(_tbl);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0744);
}

pool.query(`select * from nucleo.vw_column where "table" = '${_tbl}' `, (err, res) => {
  if(err) console.log("Error...",err)
  
  let r = res.rows;
  let htmlInpu = "", htmlEdit = "";
  fs.writeFile(_phat+toCamelCase(_tbl)+"/index.html", fnTacsList(r)
  , function(err){
    if (err) throw err;
  });
  htmlInpu = fnTacsInput(r);
  fs.writeFile(_phat+toCamelCase(_tbl)+"/add.html", htmlInpu, function(err){
    if (err) throw err;
  });
  htmlEdit = fnTacsEdit(r);
  fs.writeFile(_phat+toCamelCase(_tbl)+"/edit.html", htmlEdit, function(err){
    if (err) throw err;
  });
  pool.end()
})



/*******fn crea tac para inputs*****/
function fnTacsInput(r){
  var form = "", paramDato = "", datetime = " ",pkey = "";
  r.map(function(obj){
    var tac = "";
    if(obj.pkey) obj.type = obj.pkey;
    obj.name = toCamelCase(obj.name);
    obj.label = toLabel(obj.label);
    listColumnas.push(obj.name);
    switch(obj.type) {
      case "hidden":
      case "pkey":
        pkey = ``; // `<input type="hidden" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" class="${obj.clas}">`;
        paramDato += pkey = ``; //"          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      case "text":
        if(obj.name != "estado" && obj.name != "usuario"){
          switch(obj.dominio){
            case "dfoto":
            tac = `
          <label for="${obj.name}" class="img-thumbnail">
            <img src="" id="${obj.name}_ax" width="50" height="50" alt="" class="foto"/>
            <input type="hidden" name="${obj.name}" id="${obj.name}" class="text">
            <i>Foto</i>
            <input type="file" name="${obj.name}File" id="${obj.name}File" placeholder="Imagen" ${obj.required} 
            class="form-control file-img" onchange="minimizarImg({'imge':'${obj.required}_ax','input':'${obj.required}'});"/>
          </label>`;
            paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
            break;
            default:
            tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="30" class="form-control ${obj.clas}">`;
            paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
          }
        }
        break;
      case "json":
        if(obj.dominio == "dpunto"){
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <button type="button" class="btn btn-outline-primary" onClick="geoPop('${obj.name}')"><i class="fa fa-map-marker"></i></button>
          <input type="hidden" name="${obj.name}" id="${obj.name}" ${obj.required} class="${obj.clas}">`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
        }
        break;
      case "integer":
      case "int4":
      case "numeric":
        switch(obj.dominio){
        case "dmoneda":case "dmoneda2":case "dmoneda3":
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary" onClick="menos('${obj.name}')">-</button>
            <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" max="9999" min="0" step="1" size="5" class="form-control ${obj.clas}"/>
            <button type="button" class="btn btn-outline-primary" onClick="mas('${obj.name}')">+</button>
          </div>
          `;
        break;
        default:
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="5" class="form-control ${obj.clas}">`;
        }
        paramDato += "          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      case "date":
      case "timestamp":
        if(obj.name != "editado"){
        datetime += "#"+toCamelCase(obj.name+"_dtti")+",";
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <div class='input-group date' id='${toCamelCase(obj.name+"_dtti")}'>
            <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="16" class="form-control ${obj.clas}">
            <span class="input-group-addon">
              <span class="fa fa-calendar"></span>
            </span>
          </div>`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
        }
        break;
      case "select":
      case "fkey":
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <select name="${obj.name}" id="${obj.name}" ${obj.required} class="form-control ${obj.clas}">
            <option value="">--Seleccionar--</option>
          </select>`;
        paramDato += "          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      default:
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="10" class="form-control ${obj.clas}">`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
    }
    if(tac!=""){
      form += `<div class="form-group col">${tac}
        </div>
        `;
    }
  });
  return fnModal(form+pkey,toLabel("Crear "+_tbl), fnScriptAdd({"form": toCamelCase("form_"+"Crear "+_tbl), "param":paramDato, "datetime":datetime}));
}

/****  PREPARANDO INPUT ******/
function fnTacsEdit(r){
  var form = "", paramDato = "", datetime = " ",pkey = "";
  r.map(function(obj){
    var tac = "";
    if(obj.pkey) obj.type = obj.pkey;
    obj.name = toCamelCase(obj.name);
    obj.label = toLabel(obj.label);
    switch(obj.type) {
      case "hidden":
      case "pkey":
        pkey = `<input type="hidden" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" class="${obj.clas}">`;
        paramDato += "          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      case "text":
        if(obj.name != "estado" && obj.name != "usuario"){
          switch(obj.dominio){
            case "dfoto":
            tac = `
          <label for="${obj.name}" class="img-thumbnail">
            <img src="" id="${obj.name}_ax" width="50" height="50" alt="" class="foto"/>
            <input type="hidden" name="${obj.name}" id="${obj.name}" class="text">
            <i>Foto</i>
            <input type="file" name="${obj.name}File" id="${obj.name}File" placeholder="Imagen" ${obj.required} 
            class="form-control file-img" onchange="minimizarImg({'imge':'${obj.required}_ax','input':'${obj.required}'});"/>
          </label>`;
            paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
            break;
            default:
            tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="30" class="form-control ${obj.clas}">`;
            paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
          }
        }
        break;
      case "json":
        if(obj.dominio == "dpunto"){
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <button type="button" class="btn btn-outline-primary" onClick="geoPop('${obj.name}')"><i class="fa fa-map-marker"></i></button>
          <input type="hidden" name="${obj.name}" id="${obj.name}" ${obj.required} class="${obj.clas}">`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
        }
        break;
      case "integer":
      case "int4":
      case "numeric":
        switch(obj.dominio){
        case "dmoneda":case "dmoneda2":case "dmoneda3":
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary" onClick="menos('${obj.name}')">-</button>
            <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" max="9999" min="0" step="1" size="5" class="form-control ${obj.clas}"/>
            <button type="button" class="btn btn-outline-primary" onClick="mas('${obj.name}')">+</button>
          </div>
          `;
        break;
        default:
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="5" class="form-control ${obj.clas}">`;
        }
        paramDato += "          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      case "date":
      case "timestamp":
        if(obj.name != "editado"){
        datetime += "#"+toCamelCase(obj.name+"_dtti")+",";
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <div class='input-group date' id='${toCamelCase(obj.name+"_dtti")}'>
            <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="16" class="form-control ${obj.clas}">
            <span class="input-group-addon">
              <span class="fa fa-calendar"></span>
            </span>
          </div>`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
        }
        break;
      case "select":
      case "fkey":
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <select name="${obj.name}" id="${obj.name}" ${obj.required} class="form-control ${obj.clas}">
            <option value="">--Seleccionar--</option>
          </select>`;
        paramDato += "          "+obj.name+": "+"${data.find('#"+obj.name+"').val()},\n";
        break;
      default:
        tac = `
          <label for="${obj.name}">${obj.label} : </label>
          <input type="text" name="${obj.name}" id="${obj.name}" ${obj.required} placeholder="${obj.label}" size="10" class="form-control ${obj.clas}">`;
        paramDato += "          "+obj.name+": "+"\"${data.find('#"+obj.name+"').val()}\",\n";
    }
    if(tac!=""){
      form += `<div class="form-group col">${tac}
        </div>
        `;
    }
  });
  form += `<div class="form-group col">
          <label for="estado">Estado : </label>
          <select name="estado" id="estado" class="form-control text">
            <option value="C">Activo</option>
            <option value="X">Inactivo/Eliminado</option>
          </select>
        </div>`;
  return fnModalEdit(form+pkey,toLabel("Modificar "+_tbl), fnScriptEdit({"form": toCamelCase("form_"+"Modificar "+_tbl), "param":paramDato, "datetime":datetime}));
}


/**** fn Lista tabla****/
function fnTacsList(columnas){
  var tHead = "";
  var tBody = "";
  var tCol = "", _tbl = "";
  columnas.map(function(obj){
   if(obj.name!="estado" && obj.name!="editado" && obj.name!="usuario"){
    if(obj.pkey) obj.type = obj.pkey;
    _tbl = toCamelCase(obj.table);
    obj.name = toCamelCase(obj.name);
    obj.label = toLabel(obj.label);
    switch(obj.type) {
      case "hidden":
      case "pkey":
        tHead += `<th nowrap class="csHidden">${obj.label}</th>\n`;
        //tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
        break;
      case "text":
        tHead += `    <th nowrap>${obj.label}</th>\n`;
        tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
        break;
      case "integer":
        tHead += `    <th nowrap>${obj.label}</th>\n`;
        tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
        break;
      case "date":
        tHead += `    <th nowrap>${obj.label}</th>\n`;
        tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
        break;
      case "select":
      case "fkey":
        tHead += `    <th nowrap>${obj.label}</th>\n`;
        tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
        break;
      default:
        tHead += `    <th nowrap>${obj.label}</th>\n`;
        tBody += "                    <td>${row."+obj.name+"}</td>\n";
        tCol += obj.name+" ";
    }
   }
  });
  var pnlList = toCamelCase("pnl_"+_tbl);
  var htmlList = `
<div class="table-responsive project-stats">
<table class="table table-striped table-sm table-hover">
  <thead class="thead-default">
    <tr>
      <th><button class="btn btn-sm btn-new fa fa-plus-square" data-backdrop="static" data-toggle="modal" data-url="/${_tbl}/add.html" data-target="#pnlModal" id="new">Nuevo</button></th>
      ${tHead}
    </tr>
  </thead>
  <tbody id="${pnlList}">
  </tbody>
</table>
</div>
<div id="pnlPg"></div>`;
  if(_tbl.substring(_tbl.length-1,_tbl.length) == "s") var q = toCamelCase('all_'+_tbl);
  else var q = toCamelCase('all_'+_tbl+"s");
  var script = '<script type="text/javascript">\n'+
  '  $("#new").on("click", function(){\n'+
  '    fnUrl(this);\n'+
  '  });\n'+

//  '  $(document).ready(function() {\n'+
  '    $("tbody#'+pnlList+'").html("");\n'+
  '    var '+toCamelCase("list_"+_tbl)+' =function(pg=0,limit=pag, n=0, c=1){\n'+
//  '$("tbody#'+pnlList+'").scroll(function(pg=0,limit=pag, n=0, c=1){\n'+
//  '      var obj = this;\n'+
//  '      if(((obj.scrollHeight - obj.clientHeight) == obj.scrollTop || obj == 0) && pg <= n){\n'+
  '        var q =`query{'+q+'(offset:${pg}, first:${limit} orderBy: EDITADO_DESC){totalCount nodes{'+tCol+' estado editado usuario }}}`;\n'+
  '        fnGql({query:q, action:function(res){\n'+
  '          var d = res.data.'+q+'.nodes;\n'+
  '          n = res.data.'+q+'.totalCount;\n'+
  '          if(d.length > 0 && parseInt((pg+d.length)/pag) <= parseInt(n/pag)){\n'+
  '            $("#load").html("Cargando....");\n'+
  '            d.map(function(row) {\n'+
  '              $(".table-responsive").height(document.body.scrollHeight - 150);\n'+
  '              $("#pnlPg").html("Nro Reg. "+(pg+(c++))+" de "+n+`  <button class="btn btn-sm" onclick="pg = pg+pag; '+toCamelCase("list_"+_tbl)+'(pg);">Siguiente <i class="fa fa-chevron-right"></i></button>`);\n'+
  '              $("tbody#'+pnlList+'").append(`\n'+
  '                  <tr class="${row.estado}">\n'+
  '                    <td>\n'+
  '                      <button class="btn btn-sm btn-outline-primary fa fa-edit" title="Modificar '+_tbl+'" onClick="fnUrl(this);" data-url="/'+_tbl+'/edit.html" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato=\'{"id":"${row.id}"}\' data-name="'+_tbl+'" id="${row.id}"></button>\n'+
  '                    </td>\n'+
  ''+tBody+'\n'+
  '                  </tr>`\n'+
  '              );\n'+
  '            });\n'+
  '            $("button.permisos").popover({html:true});\n'+
  '            $("button.permisos").on("click", function(){permisos(this);});\n'+
  '            $("#load").html("");\n'+
  '            //fnTableScroll("table");\n'+
  '          }else{$(".project-stats").attr("disabled", "disabled").off("scroll");}\n'+
  '        }});\n'+
  '      }\n'+
//  '    });\n'+
  
  '    var pg = 0;'+
  '    '+toCamelCase("list_"+_tbl)+'(pg);\n'+
  '    $(".project-stats").scroll(function(){\n'+
  '      var scrollTopMax = window.scrollMaxY || (this.scrollHeight - this.clientHeight);\n'+
  '      if(this.scrollTop == scrollTopMax ){\n'+
  '        pg = pg+pag;\n'+
  '        '+toCamelCase("list_"+_tbl)+'(pg);\n'+
  '      }\n'+
  '    });\n'+
  
//  '  });\n'+
  '</script>'+
  '<script type="text/javascript" src="./js/global.js"></script>\n';
  return htmlList+"\n"+script;
}
function fnModal(colums,title, script){
  var act = toCamelCase("form_"+title);
  return `<div class="modal-dialog modal-lg" role="document">
  <form class="csForm modal-content" id="${act}">
   <fieldset>
    <div class="modal-header p-0">
      <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; ${title}</legend>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row align-items-start">
        ${colums}
      </div>
    </div>
    <div class="modal-footer justify-content-center p-2">
      <button type="submit" class="btn btn-sm btn-primary">
        <i class="fa fa-save"></i> Guardar
      </button>
      <button type="button" class="btn btn-sm btn-outline-primary" data-dismiss="modal">
        Cancelar <i class="fa fa-close"></i> 
      </button>
    </div>
   </fieldset>
  </form>
</div>
`+ script;
};

function fnModalEdit(colums,title, script){
  var act = toCamelCase("form_"+title);
  return `<div class="modal-dialog modal-lg" role="document">
  <form class="csForm modal-content" id="${act}">
   <fieldset>
    <div class="modal-header p-0">
      <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; ${title}</legend>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row align-items-start">
        ${colums}
      </div>
    </div>
    <div class="modal-footer justify-content-center p-2">
      <button type="submit" class="btn btn-sm btn-primary">
        <i class="fa fa-save"></i> Modificar
      </button>
      <button type="button" class="btn btn-sm btn-outline-primary" data-dismiss="modal">
        Cancelar <i class="fa fa-close"></i> 
      </button>
    </div>
   </fieldset>
  </form>
</div>
`+ script;
};

/*
mutation{createParametro(input: {parametro: {campo: "prfgdfgusseba", valor: "dddfddd", sistema: "dddd", descripcion: "dddddddddd"}}){
    parametro{id campo valor sistema descripcion usuario editado}
  }
}
mutation {
  updateParametroById(input: {id: 3, parametroPatch: {campo: "PRUEBA"}}){
    parametro{id campo descripcion sistema estado usuario editado}
  }
}
*/

function fnScriptAdd(obj){
  var input = (obj.param).split(",");
  var sinput = input.splice(0, 1);
  return '<script type="text/javascript">\n'+
  '$("#'+obj.form+'").submit(function(e) {\n'+
'    e.preventDefault();\n'+
'    var data = $(this);\n'+
'    var est = "C";\n'+
'    if(!$("#'+obj.form+' #estado").prop("checked")){\n'+
'      est ="X";\n'+
'    }\n'+
'    var dt = formInput(this);\n'+
'    var p =`mutation{'+toSingular(toCamelCase('create_'+_tbl))+'(input:{'+toSingular(toCamelCase(_tbl))+':{${dt}}}){\n'+
'        '+toSingular(toCamelCase(_tbl))+'{id}\n'+
'       }\n'+
'     }`;\n'+
'    fnGql({query:p, action:function(res){\n'+
'      var d = res.data.'+toSingular(toCamelCase('create_'+_tbl))+'.'+toSingular(toCamelCase(_tbl))+'.id;\n'+
'      if(d>0){\n'+
'        $("#pnlModal").modal("toggle");\n'+
'        toastr.info("Correctamente", "Se registro");\n'+
'        $("tbody#'+toCamelCase("pnl_"+_tbl)+'").html(""); \n'+
'        '+toCamelCase("list_"+_tbl)+'();\n'+
'      }else{\n'+
'        toastr.error(res.toString(), "No se registro");\n'+
'      }\n'+
'    }});\n'+
'  });\n'+
'  $(document).ready(function() {\n'+
'     $("'+(obj.datetime).replace(/[,]$/g, ' ')+'").datetimepicker({\n'+
'        format:"L",locale: "es",format: "DD/MM/YYYY"\n'+
'     });\n'+
'  });\n'+
'</script>\n'+
'<script type="text/javascript" src="./js/global.js"></script>\n';
}

function fnScriptEdit(obj){
  var input = (obj.param).split(",");
  var sinput = input.splice(0, 1);
  return '<script type="text/javascript">\n'+
  '$("#'+obj.form+'").submit(function(e) {\n'+
'    e.preventDefault();\n'+
'    var data = $(this);\n'+
'    var est = "C";\n'+
'    if(!$("#'+obj.form+' #estado").prop("checked")){\n'+
'      est ="X";\n'+
'    }\n'+
'    var dt = formInput(this);\n'+
'    var p =`mutation{'+toSingular(toCamelCase('update_'+_tbl))+'ById(input:{id:"${$("#id").val()}" '+toSingular(toCamelCase(_tbl))+'Patch:{${dt}}}){\n'+
'        '+toSingular(toCamelCase(_tbl))+'{id}\n'+
'       }\n'+
'     }`;\n'+
'    fnGql({query:p, action:function(res){\n'+
'      var d = res.data.'+toSingular(toCamelCase('update_'+_tbl))+'ById.'+toSingular(toCamelCase(_tbl))+'.id;\n'+
'      if(d>0){\n'+
'        $("#pnlModal").modal("toggle");\n'+
'        toastr.info("Correctamente", "Se registro");\n'+
'        $("tbody#'+toCamelCase("pnl_"+_tbl)+'").html(""); \n'+
'        '+toCamelCase("list_"+_tbl)+'();\n'+
'      }else{\n'+
'        toastr.error(res.toString(), "No se registro");\n'+
'      }\n'+
'    }});\n'+
'  });\n'+
'  $(document).ready(function() {\n'+
'    var dato = JSON.parse(_d(sessionStorage.getItem("'+toCamelCase(_tbl)+'")));\n'+
'    var q =`{'+toSingular(toCamelCase(_tbl))+'ById(id:"${dato.id}"){ '+listColumnas.toString()+'}}`;\n'+
'        fnGql({query:q, action:function(res){\n'+
'          var '+toSingular(toCamelCase(_tbl))+' = res.data.'+toSingular(toCamelCase(_tbl))+'ById;\n'+
'          Object.keys('+toSingular(toCamelCase(_tbl))+').map(res => {\n'+
'            $("#"+res).val('+toSingular(toCamelCase(_tbl))+'[res]);\n'+
'            if(res == "foto") $("#foto_ax").attr({"src":'+toSingular(toCamelCase(_tbl))+'["foto"]});\n'+
'          });\n'+
'        }});\n'+

'     $("'+(obj.datetime).replace(/[,]$/g, ' ')+'").datetimepicker({\n'+
'        format:"L",locale: "es",format: "DD/MM/YYYY"\n'+
'     });\n'+
'  });\n'+
'</script>\n'+
'<script type="text/javascript" src="./js/global.js"></script>\n';
}



/****Convirtiendole en camel case******/
function toCamelCase(str){
  str = str.replace(/[-_]+/g, " ");
  return str.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
  if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};

/*** Quitando espasios y colocando mayusculas a la primera letra****/
function toLabel(str){
  str = str.replace('_id', "");
  str = str.replace(/[-_]+/g, " ");
  return str.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1){
    return $1.toUpperCase(); 
  });
};


function toSingular(str){
  return str.replace(/s$/g, ' ');
};
function toSingular(text){
  var tabla = text;
  var ul = tabla.substr(-1);
  if (ul == "s") 
  return(tabla.slice(0,-1));
  else return(tabla);
}