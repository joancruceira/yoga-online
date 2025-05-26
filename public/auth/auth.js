import { obtenerUsuario, guardarUsuario } from '../components/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Si ya está logueado, redirigir automáticamente
  const usuarioExistente = obtenerUsuario();
  if (usuarioExistente) {
    window.location.href = usuarioExistente.membresia_activa ? 'clases.html' : 'membresias.html';
    return;
  }

  const formulario = document.getElementById('loginForm');

  if(!usuario){
    panelUser.innerHTML=`<nav id="nav" class="hidden md:flex space-x-6">
        <a href="index.html" class="text-gray-700 hover:text-indigo-600">Inicio</a>
        <a href="login.html" class="text-gray-700 hover:text-indigo-600">Login</a>
        <a href="membresias.html" class="text-gray-700 hover:text-indigo-600">Membresías</a>
        <a href="registro.html" class="text-gray-700 hover:text-indigo-600">Registrarse</a>
      </nav>`;
  }

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Faltan completar campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        const usuario = data.user;
        guardarUsuario(usuario); // reemplaza setItem

        if (usuario.membresia_activa) {
          window.location.href = 'clases.html';
        } else {
          window.location.href = 'membresias.html';
        }
      } else {
        alert(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('No se pudo conectar con el servidor');
    }
  });
});
