export async function getUsuarioDesdeCookie() {
  const res = await fetch('http://localhost:4000/me', {
    credentials: 'include'
  });

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error('No se pudo obtener usuario');
  }
}