let dni = localStorage.getItem("dni");
let usuario = document.getElementById('usuario');
usuario.innerHTML = dni;

let provincia = localStorage.getItem("provincia");

document.addEventListener('DOMContentLoaded', () => {
    obtenerTiempo();
});


function obtenerTiempo(){
    let tiempo = document.getElementById('tiempo');

    fetch('http://localhost:8000/mostrar_tiempo/?localidad='+provincia)
    .then(response => {
        if(!response.ok){
            alert("Error al llamar a la API");
        }
        return response.json();
    })
    .then(data =>{
        let infoTiempo = "<ul>";
        infoTiempo += "<li><strong>Localidad: </strong>"+data.localidad+"</li>";
        infoTiempo += "<li><strong>Fecha: </strong>"+data.fecha+"</li>";
        infoTiempo += "<li><strong>Temperatura Max: </strong>"+data.temperatura_max+"Cº</li>";
        infoTiempo += "<li><strong>Temperatura Min: </strong>"+data.temperatura_min+"Cº</li>";
        infoTiempo += "<li><strong>Descripción: </strong>"+data.descripcion+"</li></ul>";

        tiempo.innerHTML += infoTiempo;
        localStorage.setItem("infoTiempo", infoTiempo);
        })
}

function cerrarSesion() {
    localStorage.removeItem("dni");
    localStorage.removeItem("provincia");
    window.location.href = "login.html";
}

// Hace que esté constantemente escuchando
document.getElementById('iban').addEventListener('input', reviewIban);
function reviewIban(){
    let iban = document.getElementById('iban').value
    let ibanError = document.getElementById('ibanError')
    if(!iban.startsWith('ES') || iban.length !== 24){
        ibanError.style.display = "block"
    } else{
        ibanError.style.display = "none"
    }
}


document.getElementById('formCuenta').addEventListener('submit', validarFormulario);
function validarFormulario(event) {
    let iban = document.getElementById('iban').value;
    let saldo = document.getElementById('saldo').value;
    let v1 = document.getElementById('v1');
    let v2 = document.getElementById('v2');

    event.preventDefault(); // Evita que el formulario se envíe
    
    if (!iban.startsWith('ES') || iban.length !== 24) {
        return;
    }

    let url = "";

    if(v1.checked){
        url = 'http://localhost:8001/registrar_cuenta/?iban='+iban+'&saldo='+saldo;
    } else if(v2.checked){
        url = 'http://localhost:8000/crear_cuenta/?dni='+dni+'&iban='+encodeURIComponent(iban)+'&saldo='+saldo;
    }

    // Llamar al la dirección de la función
    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok){
            document.getElementById('iban').value = "";
            document.getElementById('saldo').value = "";
            alert("Cuenta registrada correctamente");
        } else{
            alert("Algo salió mal");
            console.log("Error al registrar la cuenta " + response.status);
        }
    })
    .catch(error => { // Salta cuando el iban está repetido o cuando no hay conexión con el servidor
        alert("Error de red o conexión: " + error.message);
        console.error("Error:", error);
    });
}

function cargarCuentas(){
    fetch('http://localhost:8000/importar_csv/?dni='+dni, {
        method: 'POST'
    })
    .then(response => {
        if(response.ok){
            alert("Cuentas cargadas correctamente en la base de datos")
        } else{
            alert("Error al cargar las cuentas en la base de datos")
        }
    })
    .catch(error => { // Salta cuando el iban está repetido o cuando no hay conexión con el servidor
        alert("Error de red o conexión: " + error.message);
        console.error("Error:", error);
    });
}