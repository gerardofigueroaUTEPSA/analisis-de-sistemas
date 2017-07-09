$(document).ready(function(){
  $('.parallax').parallax();
})

 var config = {
    apiKey: "AIzaSyCFGvqDRK-MW23qpP4OGt1_pifuLHsvS1A",
    authDomain: "analisis-de-sistemas-1.firebaseapp.com",
    databaseURL: "https://analisis-de-sistemas-1.firebaseio.com",
    projectId: "analisis-de-sistemas-1",
    storageBucket: "analisis-de-sistemas-1.appspot.com",
    messagingSenderId: "336467581867"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function login(){

  	var email = $('#email').val();
  	var password = $('#password').val();

	  firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
	  document.location.href = "administrador.html";
	  var $toastContent = $('<span> Bienvenido </span>');
  		Materialize.toast($toastContent, 5000);
    	}, function(error){
    		var $toastContent = $('<span> Error de Autenticacion </span>');
      		Materialize.toast($toastContent, 5000);
    	});
  }

  var empleados = database.ref('/empleados');
  
  function guardarEmpleado(){
  	empleados.push({
	  	nombre: $('#nombreCompleto').val(),
	  	cargo: $("#cargo").val()
	  });

  	document.getElementById("myForm1").reset();
  }

    empleados.on('value', function(snapshot){
	  	$(".listaEmpleados").html("");
	  	snapshot.forEach(function(e){
	  		var objeto = e.val();
	  		
	  		$('#plantilla').clone().appendTo(".listaEmpleados");
	  		$('.listaEmpleados #plantilla').show(10);
	  		$('.listaEmpleados #plantilla #nombreEmpleado').html(objeto.nombre);
	  		$('.listaEmpleados #plantilla #cargoEmpleado').html(objeto.cargo);
	  		$('.listaEmpleados #plantilla').attr('id',"");
	  	})	
	  });