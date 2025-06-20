/*import { generarID, guardarUsuario, existe } from './userServices.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';*/

import { registrarUsuario } from '../db/actions/usuario.action.js';


/*
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

const id=generarID();

//Crea nuevo usuario con los datos del body
  const nuevoUsuario = {
    id,
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


};*/

dotenv.config();

export const register = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      fecha_nacimiento,
      ciudad,
      provincia,
      pais,
      foto_perfil, // opcional, puede venir undefined
    } = req.body;

    // Llamada a la acción que registra el usuario y genera el token
    const { usuario, token } = await registrarUsuario({
      nombre,
      apellido,
      email,
      password,
      fecha_nacimiento,
      ciudad,
      provincia,
      pais,
      foto_perfil,
    });

    // Si no se generó correctamente
    if (!usuario || !token) {
      return res.status(500).json({ message: "No se pudo registrar el usuario" });
    }

    // Configuración de la cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    // Respuesta
    res.status(201).json({ usuario });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(400).json({ message: "Error en el registro", error: error.message });
  }
};