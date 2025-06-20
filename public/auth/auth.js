import { guardarUsuario } from '../components/localStorage.js';


  const formulario = document.getElementById('loginForm');

  formulario.addEventListener('submit', async (e) => 
    
    {
    e.preventDefault();
   
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Faltan completar campos');
      return;
    }
 
    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
        
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
      } 
      else {
        alert(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('No se pudo conectar con el servidor');
    }
  });

