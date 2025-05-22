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
        obtenerTiempo(provincia);
    })
}

function obtenerTiempo(provincia) {
    
    let provincias = {
        "Jaen": "37.7796,-3.7849"
    };

    let nombreProvincia = provincia;

    if (provincia in provincias) {
        provincia = provincias[provincia]; // Reemplaza por coordenadas
    }

    fetch('http://localhost:8000/mostrar_tiempo/?localidad=' + encodeURIComponent(provincia))
    .then(response => {
        if (!response.ok) {
            alert("Error al llamar a la API");
        }
        return response.json();
    })
    .then(data => {
        let infoTiempo = "<ul>";
        
        // Mostrar el nombre original (no las coordenadas)
        infoTiempo += "<li><strong>Localidad: </strong>" + nombreProvincia + "</li>";
        infoTiempo += "<li><strong>Fecha: </strong>" + data.fecha + "</li>";
        infoTiempo += "<li><strong>Temperatura Max: </strong>" + data.temperatura_max + "Cº</li>";
        infoTiempo += "<li><strong>Temperatura Min: </strong>" + data.temperatura_min + "Cº</li>";
        infoTiempo += "<li><strong>Descripción: </strong>" + data.descripcion + "</li></ul>";

        localStorage.setItem("infoTiempo", infoTiempo);
        window.location.href = "index.html";
    });
}