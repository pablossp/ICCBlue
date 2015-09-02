var clients;
var products;

function delOrder(ordernum){
  $.post("php/del-order.php", {ordernum: ordernum}, function(){
    $("li[value="+ordernum+"]").hide('slow', function(){
      $("li[value="+ordernum+"]").remove();
    })
  });
}

function downloadOrder(ordernum){
  document.location = 'php/excelexport.php?orderid='+ordernum;
}

function regOrder(){

  var errores = new Array();
  var today = new Date().setHours(0,0,0,0);
  var cantidad;
  var date = $("#modal-in-date").val();
  var time = $("#modal-in-time").val();

  var comparar = $("#modal-in-enddate").data('datepicker').getDate();

  var client = $("#modal-in-cliente option:selected").attr("value");
  var address = $("#modal-in-address").val();
  var orders = $("#modal-table-mapped").val();
  var comments = $("#modal-in-comments").val();
  var count = $("#modal-table-mapped").children("tbody").children("tr").length;
  var enddate = $("#modal-in-enddate").val();
  var vartable;

   if( comparar < today){
    errores.push("La fecha debe ser igual o posterior a la actual");
  }

  if(count > 0)
  {
    vartable = $('#modal-table-mapped tr:has(td)').map(function(i, v) {
                    var $td =  $('td', this);
                    return {
                             id: ++i,
                             product: $td.eq(0).attr("value"),
                             quantity: $td.eq(1).text(),
                           }
                }).get();
  }
   else{
    errores.push("No se han añadido productos a la órden");
  }
  
  if($("#modal-div-servicios").css("display") == "none")
  {
          if(errores.length < 1)
        {

        $.post("php/order-reg.php", {date: date, time: time, client: client, comments: comments, address: address, enddate: enddate, type: 0, servicios: JSON.stringify(vartable)}, function(data){
          alert("¡Órden registrada con éxito!");
          location.reload(); 
        });
        }
        else{
          var texto = "Errores Detectados: \n";
          for (var i = 0; i < errores.length; i++) {
            texto += "\n* " +errores[i];
          };
          alert(texto);
        }
      }
      else
  {
      if( comparar < today){
      alert("Fecha Invalida");
    }
    else{
      $.post("php/order-reg.php", {date: date, time: time, client: client, comments: comments, address: address, enddate: enddate, type: 1}, function(data){
          alert("¡Órden registrada con éxito!");
          location.reload();
        });
    }
  }
  }

  

function showModal(){
		$("#modalLogin").modal("show");
	}
function showModalPedido(){
    $("#modal-div-productos").css("display","");
    $("#modal-div-servicios").css("display","none");
    $("#modalRegistroLabel").text("Registrar Pedido");
    $("#btn-reg-order").text("Registrar Pedido");
    $("#modalRegistro").modal("show");
  }
function showModalConsultaPedidos(){
    $("#modalConsulta").modal("show");
  }

function showModalConsultaServicios(){

}

function showModalServicio(){
    $("#modal-div-servicios").css("display","");
    $("#modal-div-productos").css("display","none");
    $("#modalRegistroLabel").text("Registrar Servicio");
    $("#btn-reg-order").text("Registrar Servicio");
    $("#modalRegistro").modal("show");
}

function sendPW(mail){
}

function regUsr(){
  var masErrores = new Array();
	var name = $("#in-reg-usuario-name").val();
	var username = $("#in-reg-usuario-username").val();
	var password = $("#in-reg-usuario-password").val();
  var Spassword = $("#in-reg-usuario-spassword").val();
	var mail = $("#in-reg-usuario-mail").val();

  if(username.length < 1){
    masErrores.push("* Favor de ingresar un nombre de usuario");
  }else{
      if(username.indexOf(' ') >= 0)
      {
        masErrores.push("* El nombre de usuario debe ser sin espacios")
      }
  }
  if(name.length < 1)
  {
    masErrores.push("* Favor de ingresar un nombre válido");   
  }else{
      var re = /^[A-Za-z]+$/;
    if(!re.test(name))
       { 
                 masErrores.push("* Nombre invalido");
       } 
  }

if(password != Spassword)
{
  masErrores.push("* Las contraseñas deben ser iguales");
}

if(masErrores.length < 1)
{
	$.ajax({
        url: "php/user-reg.php",
        type: "POST",
        data: {name: name, username: username, password: password, mail: mail},
        dataType: "JSON",
        success: function(data) {
        	if(data.validation)
          	{
          		alert("¡Usuario registrado con éxito!, \nLe llegará una notificación al correo electrónico registrado");
              location.reload();
          	}
        },
        error: function(data)
        {
        	alert("Ha habido un error en su registro, por favor inténtelo de nuevo en un momento");
          location.reload();
        }
      });
}
else
{
  var text2="Lista de errores: \n";
  for (var i = 0; i < masErrores.length; i++) {
    text2 += "\n" + masErrores[i];
  };
  alert(text2);
}
}

function login(){
    var username = $("#in-username").val();
    var password = $("#in-password").val();
    $.post("php/login.php", {username: username, password: password}).complete(function(){ document.location.reload(); });
}

function logout(){
  $.get("php/logout.php", function(){
    document.location.reload();
  });
}

$(document).ready(function(){
	

  $.fn.modal.Constructor.prototype.enforceFocus = function() {};
  var sesion = "";
  $.get("php/init-cb.php", function(data) {
    sesion = data;
    var cookie = jQuery.cookie('activesession');
    if(sesion != "" && cookie !="") 
    {
      if(sesion == cookie)
      {
        $("#top-menu").append("\
          <li class='menu-item cb-modal' style='z-index: 99995'>\
            <a id=\"test\" href=\"#\" style='margin-left: 5px'>"+cookie+"</a>\
            <ul class=\"sub-menu\">\
              <li id=\"li-reg-ped\" onclick=\"showModalPedido()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Registrar Pedido</a></li>\
              <li id=\"li-reg-ser\" onclick=\"showModalServicio()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Registrar Servicio</a></li>\
              <li id=\"li-con-ped\" onclick=\"showModalConsultaPedidos()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Consultar Pedidos</a></li>\
              <li id=\"li-con-ped\" onclick=\"showModalConsultaServicios()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Consultar Servicios</a></li>\
              <li onclick=\"logout()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Cerrar Sesión</a></li>\
            </ul>\
          </li>");
        $("#mobile_menu").append("\
          <li class='menu-item cb-modal' style='z-index: 99995'>\
            <a id=\"test\" href=\"#\" style='margin-left: 5px'>"+cookie+"</a>\
             <ul class=\"sub-menu\">\
              <li id=\"li-reg-ped\" onclick=\"showModalPedido()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Registrar Pedido</a></li>\
              <li id=\"li-reg-ser\" onclick=\"showModalServicio()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Registrar Servicio</a></li>\
              <li id=\"li-con-ped\" onclick=\"showModalConsultaPedidos()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Consultar Pedidos</a></li>\
              <li id=\"li-con-ped\" onclick=\"showModalConsultaServicios()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Consultar Servicios</a></li>\
              <li onclick=\"logout()\" class=\"menu-item menu-item-type-post_type menu-item-object-page menu-item-490\"><a href=\"#\">Cerrar Sesión</a></li>\
            </ul>\
          </li>");
        $.get("html/modalConsulta.html", function(data){
            $("body").append(data);
        }).done(function(){
          $.post("php/order-get.php", {userid: $.cookie("User")},function(data){
            var htmlorder = "";
            for(var i = 0 ; i < data.length; i++)
            {
              var htmldetail = "";
              for(var t = 0; t < data[i].orders.length; t++)
              {

                  htmldetail += "<li><span>"+data[i].orders[t].name+"</span>\
                  <span align='right' style='float: right; margin-right: 35px'>"+data[i].orders[t].quantity+"</span></li>";
              }
                htmlorder += "<li value='"+data[i].idOrder+"' class='list-group-item'>\
                <a class='btn btn-info' tabindex='0' data-toggle='popover' role='button' data-trigger='focus' title='Comentarios' data-content='"+data[i].comments+"'>Pedido #"+data[i].idOrder+"</a>\
                <span class='badge'>"+data[i].date+"</span>\
                <br>\
                <br>\
                <span><strong>Cliente</strong></span>\
                <span style='float: right'><strong>"+data[i].name+"</strong></span>\
                <br>\
                <span><strong>Direccion</strong></span>\
                <span style='float: right'><strong>"+data[i].deliveryaddress+"</strong></span>\
                <br>\
                <span><strong>Fecha de Vencimiento</strong></span>\
                <span style='float: right'><strong>"+data[i].enddate+"</strong></span>\
                <br>\
                <br>\
                <ul>"+htmldetail+"</ul>\
                <br>\
                <div align='right'>\
                  <button type='button' class='btn btn-default' value='"+data[i].idOrder+"' onclick='delOrder($(this).attr(\"value\"))'>Eliminar</button>\
                  <button type='button' class='btn btn-default' value='"+data[i].idOrder+"' onclick=''>Modificar</button>\
                  <button type='button' class='btn btn-default' value='"+data[i].idOrder+"' onclick='downloadOrder($(this).attr(\"value\"))'>Descargar</button>\
                </div>\
                </li>";
            }
            $("#cb-list-pedidos").append(htmlorder);
          }, "json").done(function(){
            $(".btn-info").popover();
          });
        });

        $.get("html/modalRegistro.php", function(data){
          $("body").append(data);
        }).done(function(){
          $.get("php/client-get.php", function(data){
            clients = data;
            for($i = 0; $i < data.length; $i++)
            {
              $("#modal-in-cliente").append("<option value=\""+data[$i].idRecipient+"\">"+data[$i].name+"</option>");
            }
            $("#modal-in-cliente").select2({
                width: '100%'
            });
          }, "json");
          $.get("php/product-get.php", function(data){
            products = data;
            for($i = 0; $i < data.length; $i++)
            {
              $("#inPdct").append("<option value=\""+data[$i].idProduct+"\">"+data[$i].name+"</option>");
            }
            $("#inPdct").select2({
              width: '100%'
            });
          }, "json");
          $("#modal-in-enddate").datepicker({autoclose: true, format: 'dd/mm/yyyy'});
        });
      }
      else
      {
        $("#top-menu").append("\
          <li class='menu-item cb-modal' style='z-index: 99995'>\
            <a href=\"#\" onclick='showModal()' style='margin-left: 5px'>Pedidos</a>\
          </li>");
        $("#mobile_menu").append("\
          <li class='menu-item cb-modal' style='z-index: 99995'>\
            <a id=\"test\" href=\"#\" onclick='showModal()' style='margin-left: 5px'>Pedidos</a>\
          </li>");
        $.get("html/modalLogin.html", function(data){
          $("body").append(data);
        });
      }
    }
    else
    {
      $("#top-menu").append("\
        <li class='menu-item cb-modal' style='z-index: 99995'>\
          <a href=\"#\" onclick='showModal()' style='margin-left: 5px'>Pedidos</a>\
        </li>");
      $("#mobile_menu").append("\
          <li class='menu-item cb-modal' style='z-index: 99995'>\
            <a id=\"test\" href=\"#\" onclick='showModal()' style='margin-left: 5px'>Pedidos</a>\
          </li>");
      $.get("html/modalLogin.html", function(data){
        $("body").append(data);
      });
    }
  });
});

function quitar_fila(therow){
  $(therow).closest('tr').fadeOut(300, function(){
    $(this).remove();
  });
}


