import { registrarUsuario } from '../db/actions/usuario.action.js';

export const loguearse = (req, res) => {
  
  //Traigo los datos del body
  const { email, password } = req.body;
 
 //compruebo que los datos hayan sido ingresados
  if (!email || !password) {
    return res.status(400).json({ message: "Ingrese un usuario y contraseña" });
  }
  console.log(email);
 
  //intento traer los datos del json
 const usuario = obtenerUsuario(email);
console.log("Usuario:", usuario);

if (!usuario) {
  return res.status(404).json({ message: "Usuario no encontrado" });
}

  //Si no existe o la clave es incorrecta devuelvo error
  if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  //Creo el token 
  const token = jwt.sign(
    {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      membresia_activa: usuario.membresia_activa
    },
    process.env.SECRET,
    { expiresIn: '24h' }
  );

  //Envio token como cookie segura
  res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Esto debería dar false en desarrollo
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 24 * 60 * 60 * 1000
});


  return res.status(200).json({
    message: "Login exitoso",
    token,
    user: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email
    }
  });
};


