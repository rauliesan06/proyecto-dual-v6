document.getElementById('formUsuario').addEventListener('submit', iniciarSesion);
function iniciarSesion(event){
    let dni = document.getElementById('dni').value;
    let password = document.getElementById('password').value;

    event.preventDefault();

    fetch('http://localhost:8000/iniciar_sesion/?dni='+dni+'&password='+password)
    .then(response =>{
        if(response.ok){
            localStorage.setItem("dni", dni);
            obtenerProvincia(dni);
        } else{
            alert('Usuario o Contraseña Incorrecta.')
        }
    })
}

function obtenerProvincia(dni){
    fetch('http://localhost:8000/obtener_provincia/?dni='+dni)
    .then(response => {
        if(!response.ok){
            alert("No se ha podido cargar la provincia del usuario");
        }
        return response.json();
    })
    .then(provincia =>{
        localStorage.setItem("provincia", provincia);
        window.location.href = "index.html";
    })
}