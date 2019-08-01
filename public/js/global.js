$(document).ready(function(){
  $('input, textarea, select' ).each(function(){
        if($(this).attr('required')){
          if($("label[for='"+this.id+"']").text().indexOf("*") == -1){
            $("label[for='"+this.id+"']").html("<b class='aterisco'> * </b>"+$("label[for='"+this.id+"']").text());
          }
        }
    });
  /****Validar numeros***/
  $("input.int4, input.int8, input.numeric").on("blur", function(){
    var label = $('label[for="' + $(this).attr('id') + '"]').text();
    console.log(this.min,"-", this.value, $(this).val(),label,$(this));
    if(isNaN(this.value)){
      $(this).val('').focus();
      toastr.error('El dato "'+label+'" debe ser numerico, con punto(.) decimal', "Aviso", confNotiErr);
    }
    if(parseInt(this.min) > parseInt(this.value) ) {
      toastr.error("El campo ("+label+") debe ser mayor o igual ("+this.min+")", "Aviso", confNotiErr);
      $(this).val("");
    }
  });
  $(".date").on("blur", function(){
    var label = $('label[for="' + $(this).attr('id') + '"]').text().replace("*","").replace(":","");
    if($(this).attr('required')){
      var dato = this.value.split("/");
      var ano = dato[2];
      var mes = dato[1];
      var dia = dato[0];
      valor = new Date(ano, mes, dia);
      if( !moment(valor).isValid() || ano < 1900 ) {
        $(this).focus();
        toastr.error("El campo ("+label+") es de tipo fecha ", "Aviso", {
          "progressBar": true,
          "extendedTimeOut": "8000",
          "timeOut": "5000"});
      }
    }
  });
});

