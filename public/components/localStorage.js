export function obtenerUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

export function guardarUsuario(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

export function eliminarUsuario() {
  localStorage.removeItem('usuario');
}

export function estaLogueado() {
  return !!obtenerUsuario();
}

export function tieneMembresiaActiva() {
  const usuario = obtenerUsuario();
  return usuario?.membresia_activa === true;
}

/*
export function redirigirSiLogueado() {
  const usuario = obtenerUsuario();
  if (usuario?.membresia_activa) {
    window.location.href = 'clases.html';
  } else if (usuario) {
    window.location.href = 'membresias.html';
  }
}*/