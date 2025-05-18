import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const filePath = path.join(__dirname, '../data/usuarios.json');
  let usuarios = [];

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    usuarios = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Error leyendo la base de datos' });
  }

  const usuarioEncontrado = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (usuarioEncontrado) {
    return res.status(200).json({ message: 'Login exitoso', user: usuarioEncontrado });
  } else {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
};
