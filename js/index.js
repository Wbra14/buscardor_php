// Inicio proceso

$(document).ready(function() {
  //console.log("Ok index.js");
  // Inicializa los Drop Down
  $.get("./php/dropdown.php",function (retorno,status,xhr) {
    //console.log(retorno);
    if (xhr.status == 200) {
      ar_retorno = JSON.parse(retorno);
      // Ciudades
      ar_ciudades = ar_retorno.ciudades;
      for (var i = 0; i < ar_ciudades.length; i++) {
        var opt_ciudad = document.createElement("option");
        opt_ciudad .value = ar_ciudades[i];
        opt_ciudad. innerHTML = ar_ciudades[i];
        selectCiudad.appendChild(opt_ciudad);
      };
      // Tipos
      ar_tipos = ar_retorno.tipos;
      for (var i = 0; i < ar_tipos.length; i++) {
        var opt_tipo = document.createElement("option");
        opt_tipo .value = ar_tipos[i];
        opt_tipo. innerHTML = ar_tipos[i];
        selectTipo.appendChild(opt_tipo);
      };
      $("select").material_select();
    }
  });

  // Utilizando AJAX Boton mostrar todos
  $("#mostrarTodos").click(function functionName() {
    $.get("data-1.json",function (datos,status,xhr) {
      switch (xhr.status) {
        case 200:
          var tabla = $("#tabdatos");
          var cuentaTr = $('#tabdatos >tbody >tr').length - 1;
          if (cuentaTr == 0) {
            //console.log("empezo");
            datos.forEach(function (valor,indice,array) {
              $(tabla).append("<tr> <td> <p> <img src= 'img/home.jpg' width='400' height='300' align='middle'></p></td>"+
               "<td><strong> <p> Dirección: </strong>" + valor.Direccion + "<br>"+
                   "<strong>Ciudad: </strong>" + valor.Ciudad + "<br>"+
                   "<strong>Teléfono: </strong>" + valor.Telefono + "<br>"+
                   "<strong>Código postal: </strong>" + valor.Codigo_Postal + "<br>"+
                   "<strong>Precio: </strong>" + valor.Precio + "<br>"+
                   "<strong>Tipo: </strong>" + valor.Tipo +
                   "</p><br> </td> </tr>");
            });
          }
          break;
        case 404:
          console.log("Error");
          break;
        default:
          console.log("Error");
          break;
        }
      });
    });

    // Utilizando AJAX mostrar con filtro
    $("#submitButton").click(function functionName() {
      event.preventDefault();
      console.log("ok boton buscar");
      event.preventDefault();
      var ls_ciudad = $("#selectCiudad").val();
      var ls_tipo = $("#selectTipo").val();
      var precio = $("#rangoPrecio").val();
      posicion = precio.indexOf(";");
      var ldb_pinicial = precio.substring(0,posicion);
      var ldb_pfinal = precio.substring(posicion + 1,precio.length);


      $.ajax({
        url:"php/buscarDatos.php",
        type:'POST',
        data:{ciudad: ls_ciudad,
              tipo: ls_tipo,
              p_inicial: ldb_pinicial,
              p_final:ldb_pfinal
            },
        beforeSend:function() {
          console.log("Enviando información...");
        } ,
        success: function (fil_retorno,estado,xhr) {
          var fil_dato;
          if (xhr.status == 200) {

            fil_dato = JSON.parse(fil_retorno);
            console.log(fil_dato);
            ins_dato(fil_dato);

          }


        },
        error: function () {
          console.log('error');
        }
      }).done(function(data) {
        console.log("Correcto");
      }).fail(function() {
        console.log("Error");
      });

    });



});// fin document


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
// Ejecuta
inicializarSlider();
playVideoOnScroll();

// Funciones
function ins_dato(filtro) {
  $.get("data-1.json",function (datos,status,xhr) {
    switch (xhr.status) {
      case 200:
        var tabla = $("#tabdatos");
        var cuentaTr = $('#tabdatos >tbody >tr').length - 1;
        if (cuentaTr == 0) {
          //console.log("empezo");

          for (var i = 0; i < filtro.length; i++) {
            console.log(filtro[i]);

            datos.forEach(function (valor,indice,array) {
              if (filtro[i] == valor.Id) {
                console.log("Insertar");
                $(tabla).append("<tr> <td> <p> <img src= 'img/home.jpg' width='400' height='300' align='middle'></p></td>"+
                 "<td><strong> <p> Dirección: </strong>" + valor.Direccion + "<br>"+
                 "<strong>Ciudad: </strong>" + valor.Ciudad + "<br>"+
                 "<strong>Teléfono: </strong>" + valor.Telefono + "<br>"+
                 "<strong>Código postal: </strong>" + valor.Codigo_Postal + "<br>"+
                 "<strong>Precio: </strong>" + valor.Precio + "<br>"+
                 "<strong>Tipo: </strong>" + valor.Tipo +
                 "</p><br> </td> </tr>");
              }

               });
          }
        } else {
          console.log("existen datos no puedo insertar");
        }
        break;
      case 404:
        console.log("Error");
        break;
      default:
        console.log("Error");
        break;
      }
    });


}
