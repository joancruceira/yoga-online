import { obtenerUsuario, guardarUsuario } from './localStorage.js';

export async function realizarCompra(producto) {
  const usuario = obtenerUsuario();

  if (!usuario || !producto) {
    alert('Falta información del usuario o del producto.');
    return;
  }

  const datosCompra = {
    id_usuario: usuario.id,
    plan: producto.id,
    categoria: producto.categoria,
    precio: producto.precio
  };

  try {
    const res = await fetch('http://localhost:3000/compra/compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datosCompra)
    });

    let data;

    try{
      data=await res.json();
    }catch (e){ console.error('Error al parsear JSON: ', e)
      alert('Respuesta inválida del servidor');
      return;
    }

    if (res.ok) {
      alert('¡Compra realizada con éxito!');
      guardarUsuario({ ...usuario, membresia_activa: true });
      window.location.href = 'clases.html';
    } else {
      alert(data.message || 'No se pudo procesar la compra');
    }
  } catch (err) {
    console.error('Error al procesar la compra:', err);
    alert('Error de conexión con el servidor');
  }
}
