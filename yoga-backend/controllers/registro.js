import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerUser = (req, res) => {
  const { nombre, apellido, email, password, ciudad, telefono } = req.body;

  if (!nombre || !apellido || !email || !password || !ciudad || !telefono) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const filePath = path.join(__dirname, '../data/usuarios.json');
  let usuarios = [];

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    usuarios = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ message: 'Error leyendo la base de datos' });
  }

  // Verifica si el usuario ya existe por email
  if (usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    apellido,
    email: email.toLowerCase(),
    password,
    ciudad,
    telefono,
    membresia_activa: false
  };

  usuarios.push(nuevoUsuario);

  try {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: nuevoUsuario });
  } catch (err) {
    return res.status(500).json({ message: 'Error al guardar el usuario' });
  }
};
