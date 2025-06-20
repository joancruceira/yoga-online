import { connectToDatabase } from "../conexion.db.js"
import Usuario from "../schemas/usuarios.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async ({
  nombre,
  apellido,
  email,
  password,
  fecha_nacimiento,
  ciudad,
  provincia,
  pais,
  foto_perfil,
  suscripciones= [],
}) => {
  try {
    console.log("llega hasta acá");
    await connectToDatabase();
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));

    const existente = await Usuario.findOne({ email });
    if (existente) throw new Error('El correo ya está registrado');

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      fecha_nacimiento,
      ciudad,
      provincia,
      pais,
      foto_perfil,
      suscripciones,
    });
    console.log(nuevoUsuario);

    const token = jwt.sign(
      {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        membresia_activa: nuevoUsuario.suscripciones.length > 0,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    
    return { usuario: nuevoUsuario.toObject(), token };
  } catch (error) {
    console.log("Error: " + error);
  }
};