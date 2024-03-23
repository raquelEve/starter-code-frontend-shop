 
// Exercise 6

function validate() { 
	const myForm = document.getElementById('myForm');
	const formInputs = myForm.querySelectorAll('input, select, textarea');
	
	formInputs.forEach(input => {
		input.addEventListener('focus', () => {
			restablecerCss();
		});
	});
	let inputsConError = 0;
	
	for (let i = 0; i < (myForm.length - 1); i++){
		let countErrors = 0;
		const errorControl = 0;
		countErrors = validaCadVacia(myForm[i].value, countErrors);	
		countErrors = validaCadMenorTres(myForm[i].value, countErrors);		
		
		if (contieneError(errorControl, countErrors)) {
			imprimeError(myForm[i], myForm[i].dataset.error);
		} else {
			//para que no imprima los dos mensajes de error (vacio + estos)
			
			//controles extra:
			switch (myForm[i].id) {
				case "fName":
					countErrors=(validaSoloLetras(myForm[i].value, countErrors));
					if (contieneError(errorControl, countErrors)) {
						imprimeError(myForm[i], 'errorNameNumbers');
					}
					break;
				case "fLastN":
					countErrors=(validaSoloLetras(myForm[i].value, countErrors));
					if (contieneError(errorControl, countErrors)) {
						imprimeError(myForm[i], 'errorLastNameNumbers');
					}
					break;
				case "fEmail":
					countErrors=(validaEmail(myForm[i].value, countErrors));
					if (contieneError(errorControl, countErrors)) {
						imprimeError(myForm[i], 'errorEmailIncorrect');
					}
					break;
				case "fPassword":
					countErrors=(validaContrasenya(myForm[i].value, countErrors));
					if (contieneError(errorControl, countErrors)) {
						imprimeError(myForm[i], 'errorPasswordIncorrect');
					}
					break;
				case "fPhone":
					if (myForm[i].value.length != 9) {
						countErrors++
						if (contieneError(errorControl, countErrors)) {
							imprimeError(myForm[i], 'errorPhone');
						}
					}
			}
		}

		if (contieneError(errorControl, countErrors)) {
			inputsConError++;
		}
		
	}
	if (!inputsConError) {
		return true;
	} else {
		return false;
	}
}

const validaCadVacia = (text, error) => {
	if(text.length == 0){
		error++;
	}
	return error;
}

const validaCadMenorTres = (text, error) => {
	if(text.length < 3){
		error++;
	}
	return error;
}

const validaSoloLetras = (text, error) => {
	//d => cualquier digito
	if (/\d/.test(text)) {
		// si entra es que hay error, ha encontrado digitos
		error++;
	}	
	return error;
}
const validaSoloNumeros = (text, error) => {
	// cadena sólo de números
	if (!/^[0-9]+$/.test(text)) {
		error++;
	}	
	return error;
}

const validaContrasenya = (text, error) => {
							
	const patronPassword =  /^(?=.*[a-zA-Z])(?=.+\d)[a-zA-Z\d]*$/;
    if (!patronPassword.test(text)) {
        error++;
    }
    return error;
}

const validaEmail = (text, error) => {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(text)) {
        error++;
    }
    return error;
}

const imprimeError= (input, idSpanError )=>{

	let spanError = document.getElementById(idSpanError);
	spanError.classList.remove('hide');
	spanError.classList.add('show');
	input.style.border = '1px solid red';
}

const restablecerCss = () => {
	const myForm = document.getElementById('myForm');
	let spansErrors = document.getElementsByClassName("invalid-feedback");
	
	for (let spanError of spansErrors) {
        spanError.classList.remove('show');
        spanError.classList.add('hide');
    }
	for (let i = 0; i < (myForm.length - 1); i++) {
		myForm[i].style.border = '1px solid #dee2e6';
	}
}

const contieneError = (errorIni, errorFin) => {

	if (errorIni != errorFin) {
		return true;
	} else {
		return false;
	}	
}