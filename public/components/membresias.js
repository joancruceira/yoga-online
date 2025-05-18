import { realizarCompra } from "./comprar.js";

document.addEventListener('DOMContentLoaded', () => {
  const btnClases = document.getElementById('btnClases');
  const btnFormacion = document.getElementById('btnFormacion');
  const panel = document.getElementById('panelMembresias');
  const titulo = document.getElementById('categoriaTitulo');
  const contenedor = document.getElementById('cardsContainer');

  const modal = document.getElementById('modalCompra');
  const cerrarModal = document.getElementById('cerrarModal');
  const resumen = document.getElementById('resumenProducto');
  const formCompra = document.getElementById('formCompra');

  let suscripcionSeleccionada = null;

  // Cargar JSON externo con fetch
  async function cargarProductos(categoria) {
    try {
      const res = await fetch('./data/productos.json');
      const productos = await res.json();
      const filtrados = productos.filter(p => p.categoria === categoria);
      renderCards(filtrados, categoria);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  function renderCards(lista, categoria) {
    panel.classList.remove('hidden');
    titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    contenedor.innerHTML = '';

    lista.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white/90 backdrop-blur text-gray-800 p-6 rounded-2xl shadow-md';
      card.innerHTML = `
        <h4 class="text-xl font-bold text-indigo-700 mb-2">${item.titulo}</h4>
        <p class="text-gray-600 mb-4">€${item.precio} / mes</p>
        <ul class="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
          ${item.beneficios.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <button class="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 transition" data-id="${item.id}">Seleccionar</button>
      `;
      const btn = card.querySelector('button');
      btn.addEventListener('click', () => abrirModal(item));
      contenedor.appendChild(card);
    });
  }

  function abrirModal(producto) {
    suscripcionSeleccionada = producto;
    resumen.innerHTML = `
      <p class="text-sm mb-2">Categoría: <strong>${producto.categoria}</strong></p>
      <p class="text-sm mb-2">Plan: <strong>${producto.titulo}</strong></p>
      <p class="text-sm">Precio: <strong>€${producto.precio} / mes</strong></p>
    `;
    modal.classList.remove('hidden');
  }

  cerrarModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  formCompra.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!suscripcionSeleccionada) return;

    realizarCompra(suscripcionSeleccionada);
    console.log('Compra confirmada:', suscripcionSeleccionada);

    modal.classList.add('hidden');
    alert('¡Compra realizada con éxito!');
    // Redirigir o actualizar interfaz
  });

  btnClases.addEventListener('click', () => cargarProductos('clases'));
  btnFormacion.addEventListener('click', () => cargarProductos('formacion'));
});
