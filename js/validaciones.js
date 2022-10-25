/*const inputNacimiento = document.querySelector("#birth")

inputNacimiento.addEventListener("blur", (evento) => {
   validarNacimeinto(evento.target)
})*/

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = ["valueMissing","typeMismatch","patternMismatch","customError"]

const mensajerDeError = {
    nombre: {
        valueMissing: "este campo no puede estar vacia",
    },
    email: {
        valueMissing: "este campo no puede estar vacia",
        typeMismatch: "el correo no es valido",
    },
    password: {
        valueMissing: "este campo no puede estar vacia",
        patternMismatch: "Al menos una mayúscula, una minúscula y un múmero, entre 4 y 8 caracteres",
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacia",
        customError: "debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es de 10 digitos",
    },
    direccion: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es de 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es de maximo 20 caracteres",
    },
    estado: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es de maximo 20 caracteres",
    }
}

const validadores = {
    nacimiento: input => validarNacimeinto(input)
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajerDeError[tipoDeInput][error]
        }
    })

    return mensaje
}

function validarNacimeinto(input) {
    const fechaCliente = new Date(input.value)
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje="debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciaFechas <= fechaActual
}