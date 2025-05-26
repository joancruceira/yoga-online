import {
  obtenerUsuario,
  eliminarUsuario
} from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const nombreSpan = document.getElementById('nombreUsuario');
  const logoutLink = document.getElementById('logout');

  const usuario = obtenerUsuario();

 if (!usuario) {
    let cerrarSesion=document.querySelector("#logout");
    cerrarSesion.innerHTML=`<a href="./index.html" id="index" class="text-indigo-500 hover:underline">Inicio</a>`;
    return;
  }

  nombreSpan.textContent = usuario.nombre || 'Invitado';

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que recargue la página
    eliminarUsuario();
    window.location.href = 'index.html';
  });
});
