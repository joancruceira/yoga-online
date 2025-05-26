import { redirigirSiLogueado } from './localStorage.js';

// Redirige si ya hay sesión activa
document.addEventListener('DOMContentLoaded', () => {
  redirigirSiLogueado();
});

let btnRegistro=document.querySelector("#btnRegistro"); 

btnRegistro.addEventListener("click", (e)=>{
  window.location.href = 'registro.html'

});

/*const botonMas = document.getElementById('Mas');
const contenedorData = document.getElementById('Data');

 Creamos un párrafo pero no lo insertamos todavía
const parrafo = document.createElement('p');
parrafo.innerHTML = `
  Saturna Yoga es un espacio virtual diseñado para conectar cuerpo, mente y espíritu a través de clases guiadas,
  formación profesional y una comunidad activa. Nuestro enfoque combina tradición, accesibilidad y modernidad
  para que puedas practicar desde cualquier lugar del mundo, a tu ritmo y con acompañamiento.
`;
parrafo.style.marginTop = "10px";
parrafo.id = "infoSaturna";

let visible = false;

botonMas.addEventListener('click', () => {
  if (!visible) {
    contenedorData.appendChild(parrafo);
  } else {
    const existente = document.getElementById('infoSaturna');
    if (existente) existente.remove();
  }
  visible = !visible;
});*/
