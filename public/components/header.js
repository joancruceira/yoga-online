import { obtenerUsuario, eliminarUsuario } from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.querySelector('.panelUser');
  const usuario = obtenerUsuario();

  if (!navContainer) return;

  if (usuario) {
    navContainer.innerHTML = `
      <div class="relative inline-block text-left group">
  <button class="inline-flex items-center px-4 py-2 bg-white text-gray-700 hover:text-indigo-600 focus:outline-none transition">
    Hola, ${usuario.nombre}
    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50 invisible group-hover:visible">
    <a href="perfil.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Perfil</a>
    <a href="progreso.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Mi Progreso</a>
    <a href="suscripcion.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Suscripción</a>
    <a href="privacidad.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Privacidad</a>
    <button id="cerrarSesion" class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cerrar Sesión</button>
  </div>
</div>

    `;

    // Agregar logout listener
    document.addEventListener('click', (e) => {
      if (e.target.id === 'cerrarSesion') {
        eliminarUsuario();
        window.location.href = 'index.html';
      }
    });

  } else {
    // Si no hay usuario logueado, mostrar menú normal
    navContainer.innerHTML = `
      <a href="index.html" class="text-gray-700 hover:text-indigo-600">Inicio</a>
      <a href="login.html" class="text-gray-700 hover:text-indigo-600">Login</a>
      <a href="membresias.html" class="text-gray-700 hover:text-indigo-600">Membresías</a>
      <a href="registro.html" class="text-gray-700 hover:text-indigo-600">Registrarse</a>
    `;
  }
});
