import { obtenerUsuario } from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const usuario = obtenerUsuario();

  // Redirige si ya hay sesión activa
  if (usuario) {
    window.location.href = usuario.membresia_activa ? 'clases.html' : 'membresias.html';
    return;
  }

  const btnRegistrar = document.getElementById('registrar');

  btnRegistrar.addEventListener('click', async (e) => {
    e.preventDefault(); // Previene comportamiento por defecto si está dentro de un <form>

    const nuevoUsuario = {
      nombre: document.getElementById('nombre').value.trim(),
      apellido: document.getElementById('apellido').value.trim(),
      email: document.getElementById('email').value.trim().toLowerCase(),
      fechaNacimiento : document.getElementById('fecha_nacimiento').value,
      password: document.getElementById('password').value,
      ciudad: document.getElementById('ciudad').value.trim(),
      provincia: document.getElementById('provincia').value.trim(),
      pais: document.getElementById('pais').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      membresia_activa: false
    };

    try {
      const res = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registro exitoso');
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error('Error al registrar:', err);
      alert('No se pudo completar el registro');
    }
  });
});
