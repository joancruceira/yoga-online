import {
  obtenerUsuario,
  eliminarUsuario
} from './localStorage.js';

const classList = document.querySelectorAll('#class-list button');
const video = document.getElementById('class-video');
const prevBtn = document.getElementById('prev-class');
const nextBtn = document.getElementById('next-class');

let currentIndex = 0;

function updateVideo(index) {
  classList.forEach((btn, i) => {
    btn.classList.toggle('bg-indigo-100', i === index);
    btn.classList.toggle('text-indigo-700', i === index);
    btn.classList.toggle('hover:bg-indigo-50', i !== index);
  });

  video.src = classList[index].dataset.src;
  currentIndex = index;

  prevBtn.classList.toggle('invisible', currentIndex === 0);
  nextBtn.classList.toggle('invisible', currentIndex === classList.length - 1);
}

classList.forEach((btn, i) => {
  btn.addEventListener('click', () => updateVideo(i));
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) updateVideo(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < classList.length - 1) updateVideo(currentIndex + 1);
});

document.addEventListener('DOMContentLoaded', () => {
  const nombreSpan = document.getElementById('nombreUsuario');
  const logoutLink = document.getElementById('logout');

  const usuario = obtenerUsuario();

  if (!usuario) {
    // Redirige si no hay sesión activa
    window.location.href = 'index.html';
    return;
  }

  nombreSpan.textContent = usuario.nombre || 'Usuario';

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que recargue la página
    eliminarUsuario();
    window.location.href = 'index.html';
  });
});
