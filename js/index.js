// Inicio proceso

$(document).ready(function() {
  console.log("Ok index.js");
  $.get("./php/app.php",function (ciudades,status,xhr) {
    console.log(ciudades);
    console.log(status);
    console.log(xhr.status);
    if (xhr.status == 200) {
      console.log(xhr);
      var opt_ciudad = document.createElement("option");
      opt_ciudad .value = "Quito";
      opt_ciudad. innerHTML = "Quito";
      var opt_ciudad1 = document.createElement("option");
      opt_ciudad1 .value = "Guyaquil";
      opt_ciudad1. innerHTML = " Guyaquil ";
      selectCiudad.appendChild(opt_ciudad);
      selectCiudad.appendChild(opt_ciudad1);
      $("select").material_select();


    }

  });












  // Utilizando AJAX
  $("#mostrarTodos").click(function functionName() {
    $.get("data-1.json",function (datos,status,xhr) {
      switch (xhr.status) {
        case 200:
          //console.log("recuperacion exitosa");
          var tabla = $("#tabdatos");
          var cuentaTr = $('#tabdatos >tbody >tr').length - 1;
          //console.log(cuentaTr);
          //console.log(datos);
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

});


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

inicializarSlider();
playVideoOnScroll();
