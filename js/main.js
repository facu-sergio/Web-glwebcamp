(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", function(){
      if(document.getElementById('mapa') ) {
      var map = L.map('mapa').setView([-34.906144, -418.553277], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([-34.906144, -418.553277]).addTo(map)
          .bindPopup('gldwebcamp 2018 </br> Boletos ya disponibles')
          .openPopup();}
        //campos datos usuarios
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let email = document.getElementById("email");
        //campos pases
        let pase_dia = document.getElementById('pase_dia');
        let pase_completo = document.getElementById('pase_completo');
        let pase_dosdias = document.getElementById('pase_dosdias');

        //botones y divs
        let calcular = document.getElementById("calcular");
        let errorDiv = document.getElementById("error");
        let botonRegistro = document.getElementById("btnRegistro");
        let lista_productos = document.getElementById("lista-productos");
        let regalo = document.getElementById("regalo");
        let suma= document.getElementById("suma-total");
        let dias=[];

        //extras
        let camisas = document.getElementById("camisa_evento");
        let etiquetas = document.getElementById("etiquetas")

        //listeners
        if(calcular){
        calcular.addEventListener("click", calcularMontos);

        pase_dia.addEventListener("blur", mostrarDias);
        pase_dosdias.addEventListener("blur", mostrarDias);
        pase_completo.addEventListener("blur", mostrarDias);

        nombre.addEventListener("blur", validar);
        apellido.addEventListener("blur", validar);
        email.addEventListener("blur", validar);
        email.addEventListener("blur", validarEmail);



        //funciones
        function calcularMontos(event){
          event.preventDefault();
          if(regalo.value===""){
            alert("Debes elegir un regalo");
            regalo.focus();
          }else{
             let  boletosDia = parseInt(pase_dia.value, 10)|| 0,
                  boletos2Dias= parseInt(pase_dosdias.value, 10)|| 0,
                  boletosCompleto= parseInt(pase_completo.value, 10)|| 0,
                  cantCamisas = parseInt(camisas.value, 10)|| 0,
                  cantEtiquetas = parseInt(etiquetas.value, 10)|| 0;

             let total = (boletosDia*30) + (boletosCompleto*50) + (boletos2Dias*45) +((cantCamisas*10)*.93) +(cantEtiquetas*2);

             let listadoProductos = [];

             if(boletosDia>= 1){
                listadoProductos.push(boletosDia + " Pases por dia");
             }
             if (boletos2Dias>= 1) {
                listadoProductos.push(boletos2Dias +" Pases por dos dias");
             }
             if (boletosCompleto>= 1) {
                listadoProductos.push(boletosCompleto +" Pases por dos dias");
             }
             if (cantCamisas>= 1) {
                listadoProductos.push(cantCamisas +" Camisas");
             }
             if (cantEtiquetas>= 1) {
                listadoProductos.push(cantEtiquetas +" Etiquetas");
             }

             lista_productos.style.display = "block";
             lista_productos.innerHTML = "";//para vaciarla y que no muestre repetido
             for(let i=0;i<listadoProductos.length;i++){
               lista_productos.innerHTML += listadoProductos[i]+"<br/>";
             }

             suma.innerHTML = "$ "+ total.toFixed(2);
          }
        }
      }//if calcular null para que no tire error por no encontar el evento en index
        function mostrarDias(){
          let boletosDia = parseInt(pase_dia.value, 10)|| 0,
              boletos2Dias= parseInt(pase_dosdias.value, 10)|| 0,
              boletosCompleto= parseInt(pase_completo.value, 10)|| 0;

          let diasElegidos = [];

          //aca uso push el profe pero yo preferi igualar para que los pueda ocultar
          if (boletosDia > 0) {
            diasElegidos=["viernes"];
          }
          if (boletos2Dias > 0) {
            diasElegidos=["viernes","sabado"];
          }
          if (boletosCompleto > 0) {
            diasElegidos=["viernes","sabado","domingo"];
          }
          console.log(diasElegidos);
          for(let i=0;i < diasElegidos.length;i++){
          document.getElementById(diasElegidos[i]).style.display= "block";
          }

          //Para ocultar si vuelven a 0
          if(diasElegidos.length<3 ) {
                  document.getElementById("domingo").style.display= "none";
              }
          if(diasElegidos.length<2 ) {
                  document.getElementById("sabado").style.display= "none";
              }
          if(diasElegidos.length<1 ) {
                  document.getElementById("viernes").style.display= "none";
              }
        }//termina la funcion mostrarDias

    function validar(){
      if(this.value==""){
        errorDiv.style.display="block";
        errorDiv.innerHTML="Campo obligatorio";
        this.style.border="1px solid red";
        errorDiv.style.border="1px solid red"
      }else {
        errorDiv.innerHTML = "";
        errorDiv.style.display="none";
        errorDiv.style.border = 'none';
        this.style.border = '1px solid #cccccc';
      }
    }

  function validarEmail(){
    if(this.value.indexOf("@") == -1 || this.value.indexOf(".com") == -1) {
         errorDiv.innerHTML = "La direccion de E-mail es invalida";
         this.style.border = '1px solid red';
         errorDiv.style.border = '2px solid #fe4918';
       }
  }

    }); //DOM CONTENT LOADAED
})();

//jQuery
$(function(){
  //Animacion Titulo del evento
  $("h1.nombre-sitio").lettering();
  //menu fijo
  let windowHeigth = $(window).height(); // nos da la altura de la ventada
  let barraAltura = $(".barra").innerHeight();
   console.log(barraAltura);
  $(window).scroll(function(){
    let scroll=$(window). scrollTop();
    if(scroll > windowHeigth){
       $(".barra").addClass("fixed");
       $(" body").css({"margin-top": barraAltura + "px"})
    }else{
      $(".barra").removeClass("fixed");
      $(" body").css({"margin-top": "0"})
    }
  })

  //resice de pantalla
    var breakpoint = 768;
    $(window).resize(function() {
    if($(document).width() >= breakpoint){
      $('.navegacion-principal').show();
      } else {
        $('.navegacion-principal').hide();
      }
    });
  // Menu Responsivo
 $(".menu-movil").on("click",function(){
   $(".navegacion-principal").slideToggle();
 })

  //Programa DEL EVENTO
  $(".programa-evento .info-curso:first").show();// para que x defaul muestre los talleres
  $("nav.menu-programa a:first").addClass("activo");// para resaltar en el nav talleres
  $(" nav.menu-programa a").on("click",function(){  //funcion que recibe el evento click en los enlaces del nav
    $("nav.menu-programa a").removeClass("activo");//quito la clas activo para sacar el resaltado de los otros a y
    $(this).addClass("activo");                   //le agrego activo para resaltar el que llamo al enveto
    $(".ocultar").hide();                         // oculto talleres o el div que se estaba mostrando antes
    let enlace=$(this).attr("href");              // caputro en una variable el href que es igual al nombre de las id de los divs
    $(enlace).fadeIn(1000);                       // usando esa variable muestro el div que corresponde en cada caso
    return false;                                 // para eveitar el salto
  })

  //Animaciones Numeros
  $(".resumen-evento li:nth-child(1) p").animateNumber({number:6},600);
  $(".resumen-evento li:nth-child(2) p").animateNumber({number:15},900);
  $(".resumen-evento li:nth-child(3) p").animateNumber({number:3},400);
  $(".resumen-evento li:nth-child(4) p").animateNumber({number:9},800);

  //Animacion para Cuenta regresiva
  $(".cuenta-regresiva").countdown("2019/11/14 09:00:00",function(event){
    $("#dias").html(event.strftime("%D"));
    $("#horas").html(event.strftime("%H"));
    $("#minutos").html(event.strftime("%M"));
    $("#segundos").html(event.strftime("%S"));
  })
})
