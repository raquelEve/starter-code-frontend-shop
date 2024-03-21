/** id spans de errores:e rrorName, errorEmail, errorAddress, errorLastN, errorPassword, errorPhone */ 
// Exercise 6
function validate() {
	console.log("hola");
	// var error = 0; TODO: cambiar
	var error = 1;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");  
	let myform=document.forms["myform"];

	console.log(document.forms["myform"][0]);
	console.log(document.forms["myform"].length);
	console.log(document.forms["myform"]);

	//para todos los campos revisamos cadena vacía y menor de 3caracteres

	for(let i= 0; i< myform.length-1; i++){
		 error= validaCadVacia(myform[i].value, error);
		 error= validaCadMenorTres(myform[i].value, error);		
	}

	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value == ""){
		error++;
	}

	if(fEmail.value == ""){
		error++;
	}
	 
	if(error>0){
		// alert("Error");
		return false;
	}else{
		// alert("OK");
		return true;
	}


}

const validaCadVacia= (text, error) =>{
	if(text.length == 0){
		error++;
	}
	return error;
}

const validaCadMenorTres= (text, error) =>{
	if(text.length > 3){
		error++;
	}
	return error;
}

const validaSoloLetras=(text, error)=>{
	
	
}