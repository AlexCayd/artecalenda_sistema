
var btnedicion = document.querySelector(`.editar`)
const btnAgregar=document.getElementById('btnAgregar')
const contenedorTabla=document.getElementById('cuerpoTabla');
//Array para mantener a los usuarios registrados
var usuariosAgregados = [];
var verContrasena=document.getElementById('verContrasena');
var verContrasenaAgregarUsuario=document.getElementById('verContrasenaAgregar');
var BotonconfirmarEditar=document.getElementById('confirmarBtn');


//Los if son para los casos en que el boton exista dentro de la pagina

if(verContrasenaAgregarUsuario){
    verContrasenaAgregarUsuario.addEventListener('click',mostrarContraseña)
}


if (verContrasena) {
    verContrasena.addEventListener('click',mostrarContraseña)
    BotonconfirmarEditar.addEventListener('click',confirmarModificacion)
}

if (btnAgregar) {
    btnAgregar.addEventListener('click', agregar);
    
}
    
//Funcion para agregar usuario
function agregar(e) {
    e.preventDefault()
    //Si existe en localstroage hace el array de usuariosAgregados lo que esta en localstorage
    if((JSON.parse(localStorage.getItem('Usuarios')))){
        usuariosAgregados=(JSON.parse(localStorage.getItem('Usuarios')))
        
    }
    //Agarras valores de los elementos dentro del form de la pagina de agregar para convertirlos en variables
    var nombreUsuario=document.getElementById(`nombre`).value
    var emailUsuario=document.getElementById(`email`).value
    var contraseña = document.getElementById(`password`).value
    var Ccontraseña = document.getElementById(`password_confirmation`).value
    //Crea objeto con esas variables
    const infoUsuario = {
        nombre: nombreUsuario,
        email: emailUsuario,
        contraseña: contraseña,
        Ccontraseña: Ccontraseña,
    }
    //Agregas el objeto creado con los elementos actuales al array de usuarios agregados

    if(usuariosAgregados){
        contador=1
        usuariosAgregados.forEach(elemento => {
            if(elemento["email"]==emailUsuario){
                contador=0
                return alert("El email ya existe")
                }
                
            })
             if (document.getElementById('password').value!=document.getElementById('password_confirmation').value) {
                contador=0
                return alert("Las contraseñas no coinciden")
                
            }
            else if (contador==1) {
                usuariosAgregados.push(infoUsuario)
                localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados))
                return alert("Usuario Agregado desde forEach") 
            }
        }

        if(!usuariosAgregados){
            usuariosAgregados.push(infoUsuario)
            localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados))
            return alert("Usuario Agregado desde memoria") 
        }


    
    
}
//Funcion para cargar usuarios de localstorage



function eliminarUsuario(e){
    // Buscamos la informacion requerida dado en el click
    var clickdado=e.target.parentElement.parentElement;
    
    if (clickdado.classList.contains("tabla__tr")) {
        //Te devuelve el Email del evento seleccionado
        //Agarramos el email del evento seleccionado para compararlo en el array que tenemos 
        var emailActual=(clickdado.children[1].textContent)
        //Sacamos todos los elementos que esten en localstorage
        usuariosAgregados=JSON.parse(localStorage.getItem('Usuarios'))
        respuesta=prompt('Seguro que quieres borrar?')

        //Iteramos entre todos los elementos del arreglo
        usuariosAgregados.forEach(elemento => {
            // Si los email son iguales
            if(elemento["email"]==emailActual  && respuesta=="si"){
                valorARemover=usuariosAgregados.indexOf(elemento) //Nos devuelve la posicion de donde está el correo
                if (valorARemover > -1) { //Si el elemento existe dentro del arreglo
                    usuariosAgregados.splice(valorARemover, 1); //remueve el elemento
                    localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados)) //Actualiza el localstorage despues de eliminar el arreglo correspondiente
                    limpiarHTML() //Limpia el html
                    cargarUsuarios()//Vuelve a cargar a los usuarios
                    
                }
            }    
            
        })
        
    }
    //ESTO HACE LO MISMO SOLO EN CASO DE DAR CLICK EN EL ICONO
    else if (clickdado.parentElement.classList.contains("tabla__tr")) {
        var clickdado=e.target.parentElement.parentElement.parentElement;
        //Dar clcik en icono
        var emailActual=(clickdado.children[1].textContent);
        respuesta=prompt('Seguro que quieres borrar?')
        usuariosAgregados=JSON.parse(localStorage.getItem('Usuarios'))
        limpiarHTML()
        usuariosAgregados.forEach(elemento => {
            if(elemento["email"]==emailActual && respuesta=="si"){
                valorARemover=usuariosAgregados.indexOf(elemento)
                if (valorARemover > -1) {
                    usuariosAgregados.splice(valorARemover, 1);
                    localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados))
                    cargarUsuarios()
                    
                }
            }    
            
        });
    }
     
    
}

function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    //Agarra el cuerpo de la tabla
    Tabla=document.getElementById('cuerpoTabla')
    //Mientras la tabla tenga elementos dentro de ella, se irán borrando 1 por 1
    while(Tabla.firstChild) {
        Tabla.removeChild(Tabla.firstChild);
    }
    
}

function cargarUsuarios() {
    // agarramos los usuarios dentro de localstorage de la pagina
    usuariosGuardados=JSON.parse(localStorage.getItem('Usuarios'))
    

    //Vamos a iterar en todos los elementos que tenemos dentro del localstorage
    usuariosGuardados.forEach(userData => {
    
        //Creacion del contenedor de botones
        const contenedorBotones=document.createElement('td') //creamos un elemento (td)
        contenedorBotones.classList.add('contenedor-botones')// le agregamos la clase de contenedor botones
        
        //creacion y formato del boton de editar
        const buttonEditar=document.createElement('a') //Creamos un elemento tipo "a"
        buttonEditar.classList.add('editar')//le ponemos la clase de editar
        buttonEditar.href='editar.html' // Le ponemos el atributo de href con el contenido de 'editar.html'
        buttonEditar.innerHTML=` <i class="fas fa-edit"></i>`// le agregamos un icono con este HTML 
        contenedorBotones.appendChild(buttonEditar)// agregamos el boton creado al contenedor de botones
        
        //creacion y formato del boton de eliminar
        const buttonEliminar=document.createElement('a')//Creamos un elemento tipo "a"
        buttonEliminar.classList.add('eliminar')//le ponemos la clase de eliminar
        buttonEliminar.innerHTML=`<i class="fas fa-trash-alt"></i>`// le agregamos un icono con este HTML 
        contenedorBotones.appendChild(buttonEliminar)// agregamos el boton creado al contenedor de botones

        //Formato del row
        const row = document.createElement('tr') //Creamos un elemento tipo (tr) llamado "row"
        row.classList.add('tabla__tr') //le agregamos la clase de tabla__tr
        //HTML agregado en row 
        row.innerHTML = `
        <td class="tabla__td" id="nombre">${userData["nombre"]}</td>
        <td class="tabla__td" id="email">${userData["email"]}</td>
        <td class="tabla__td" id="contraseña">${userData["contraseña"]}
        </td>`;
        
        row.appendChild(contenedorBotones) //Agregamos el contenedor de botones (td) al row que creamos (tr)
        buttonEliminar.addEventListener('click',eliminarUsuario)// agregamos un addEventListener a boton de eliminar
        buttonEditar.addEventListener('click',editarUsuarios)// agregamos un addEventListener a boton de Editar
        contenedorTabla.appendChild(row) //Agregamos la fila que acabamos de crear al contenedor (o cuerpo) de la tabla
        
    })
}

function editarUsuarios(e){

    var clickdado=e.target.parentElement.parentElement;// seleccionamos los elementos padre (2 veces) de donde dimos el click
    if (clickdado.classList.contains("tabla__tr")) { //Si el clickdado contiene la clase "tabla__tr"....
    
        var emailActual=(clickdado.children[1].textContent) //Nos devuelve el email correspondiente de donde dimos click
        usuariosAgregados=JSON.parse(localStorage.getItem('Usuarios')) //Creamos variable llamadao usuariosAgregados del localStorage de la pagina

        //Iteramos el arreglo de usuarios agregados que acabamos de crear
        usuariosAgregados.forEach(elemento => {
            if(elemento["email"]==emailActual){ //en caso de que el email actual y el email dentro del arreglo coincidan....
              posArray=usuariosAgregados.indexOf(elemento) //Te da la posicion de ese elemento dentro del arreglo
              usuariosAgregados.splice(posArray,1) //Elimina ese arreglo
              localStorage.setItem('datosPorEditar',JSON.stringify(elemento)) // y lo mete dentro de localStorage con el nombre de 'datosporEditar'
              localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados))//Actualiza el localStorage de los arreglos de usuarios (general) 
              
            }    
            
        })


    }
    // Es lo mismo de lo de arriba solo en caso de que se de click en icono
    else if (clickdado.parentElement.classList.contains("tabla__tr")) {
        clickdado=clickdado.parentElement
        var emailActual=(clickdado.children[1].textContent)
        usuariosAgregados=JSON.parse(localStorage.getItem('Usuarios'))

        usuariosAgregados.forEach(elemento => {
            if(elemento["email"]==emailActual){
              posArray=usuariosAgregados.indexOf(elemento)
              usuariosAgregados.splice(posArray,1)
              localStorage.setItem('datosPorEditar',JSON.stringify(elemento))
              localStorage.setItem('Usuarios', JSON.stringify(usuariosAgregados))
            //   eliminarUsuario()
            }    
            
        })
        
    }   
}

function mostrarContraseña(){

    contrasena=document.getElementById('password')//Agarramos el elemento de contraseña
    Ccontrasena=document.getElementById('password_confirmation');//Agarramos el elemento de Confirmacion de contraseña
    if (contrasena.getAttribute("type")=="text") {// Si el atributo de contraseña es tipo texto
        contrasena.setAttribute("type","password") //Hacemos el atributo de ambos contraseña
        Ccontrasena.setAttribute("type","password")
    }else{// En caso de que no sea tipo texto
        contrasena.setAttribute("type","text") //Hacemos ambos texto
        Ccontrasena.setAttribute("type","text")
        
    }

}

function desplegarDatosPorEditar(){
    usuarioAEditar=JSON.parse(localStorage.getItem('datosPorEditar'))
    //Establecer los valores de todos los inputs
    document.getElementById("password").value=usuarioAEditar["contraseña"]
    document.getElementById("email").value=usuarioAEditar["email"]
    document.getElementById("nombre").value=usuarioAEditar["nombre"]
    document.getElementById("password_confirmation").value=usuarioAEditar["Ccontraseña"]

}

function confirmarModificacion(){
    if (document.getElementById('password').value==document.getElementById('password_confirmation').value) {
        alert("Las contrasenas son iguales")
        usuariosGuardados=JSON.parse(localStorage.getItem('Usuarios'))
        modificaciones={
            nombre:document.getElementById('nombre').value,
            email:document.getElementById('email').value,
            contraseña:document.getElementById("password").value,
            Ccontrasena:document.getElementById('password_confirmation').value,
        }
        console.log(usuariosGuardados)
        usuariosGuardados.unshift(modificaciones)
        localStorage.setItem('Usuarios',JSON.stringify(usuariosGuardados))
        localStorage.setItem('datosPorEditar',JSON.stringify(modificaciones))
        BotonconfirmarEditar.href="registros.html"

    }else{
        alert('las contrasenas no son las mismas')
        document.getElementById("password").value
        document.getElementById("nombre").value
        document.getElementById("nombre").value
        document.getElementById("password_confirmation").value
        desplegarDatosPorEditar()
    }
}
