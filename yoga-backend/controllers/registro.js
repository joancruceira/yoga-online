import { obtenerUsuarios, guardarUsuario, existe } from './userServices.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




export const register = async (req, res) => {

    const {
    nombre,
    apellido,
    email,
    password,
    ciudad,
    telefono
  } = req.body;


if (!nombre || !apellido || !email || !password || !ciudad || !telefono) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  //hashear la clave
  const hashedPassword = bcrypt.hashSync(password, process.env.SALT);
  
  // Verifica si el usuario ya existe por email
 if (existe(email)) {
  return res.status(409).json({ message: 'El usuario ya existe' });
}

//Crea nuevo usuario con los datos del body
  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    apellido,
    email: email.toLowerCase(),
    password: hashedPassword,
    ciudad,
    telefono,
    membresia_activa: false
  };

  try {
    guardarUsuario(nuevoUsuario);
  } catch (err) {
    return res.status(500).json({ message: 'Error al guardar el usuario' });
  }

  const token = jwt.sign(
  {
    email: nuevoUsuario.email,
    membresia_activa: nuevoUsuario.membresia_activa
  },
  process.env.SECRET,
  { expiresIn: '24h' }
);

// Enviar la cookie al navegador
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 24 * 60 * 60 * 1000
});

// Respuesta final al frontend
return res.status(201).json({
  message: 'Registro exitoso',
  token,
  user: {
    nombre: nuevoUsuario.nombre,
    apellido: nuevoUsuario.apellido,
    email: nuevoUsuario.email
  }
});


};

