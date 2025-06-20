import fs from 'fs';
import { getPaths } from './paths.js';
import path from 'path';

const { __dirname, __filename } = getPaths(import.meta.url);

function generarId(lista, campo = 'id') {
  if (!Array.isArray(lista) || lista.length === 0) return 1;
  const ult = lista[lista.length - 1][campo];
  return typeof ult === 'number' ? ult + 1 : 1;
}

export const procesarCompra = (req, res) => {
  const { plan, categoria, precio } = req.body;
  const id_usuario = req.user?.id;
  console.log("req.user:", req.user);
  console.log("Datos recibidos para procesar compra:", req.body);

  const parsedPrecio = Number(precio);
  if (!id_usuario || !plan || !categoria || isNaN(parsedPrecio)) {
    return res.status(400).json({ message: 'Faltan datos para procesar la compra' });
  }

  const idCategoria = categoria === 'clases' ? 0 : 1;

  try {
    // 1. Registrar compra en compras.json
    const comprasPath = path.join(__dirname, '../data/compras.json');
    const compras = fs.existsSync(comprasPath)
      ? JSON.parse(fs.readFileSync(comprasPath, 'utf-8'))
      : [];

    const nuevaCompra = {
      id_compra: generarId(compras, 'id_compra'),
      id_usuario,
      idPlan: plan,
      idCategoria,
      precio: parsedPrecio
    };

    compras.push(nuevaCompra);
    console.log("Escribiendo compra...");
    fs.writeFileSync(comprasPath, JSON.stringify(compras, null, 2));

    // 2. Activar membresía
    const usuariosPath = path.join(__dirname, '../data/usuarios.json');
    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));
    const indexUsuario = usuarios.findIndex(u => u.id === id_usuario);
    if (indexUsuario === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuarios[indexUsuario].membresia_activa = true;
    console.log("Actualizando usuario...");
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    // 3. Registrar en suscripciones.json
    const suscripcionesPath = path.join(__dirname, '../data/suscripciones.json');
    const suscripciones = fs.existsSync(suscripcionesPath)
      ? JSON.parse(fs.readFileSync(suscripcionesPath, 'utf-8'))
      : [];

    const fechaHoy = new Date().toISOString().split('T')[0];
    const nuevaSuscripcion = {
      id: generarId(suscripciones),
      id_usuario,
      fecha_inicio: fechaHoy,
      plan: categoria,
      activo: true,
      clases_vistas: []
    };

    suscripciones.push(nuevaSuscripcion);
    console.log("Escribiendo suscripción...");
    fs.writeFileSync(suscripcionesPath, JSON.stringify(suscripciones, null, 2));

    return res.status(201).json({ message: 'Compra registrada correctamente' });

  } catch (error) {
    console.error('⚠️ Error al procesar la compra:\n', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
