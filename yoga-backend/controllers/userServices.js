import fs from 'fs';
import path from 'path';
import { getPaths } from './paths.js';

const { __dirname } = getPaths(import.meta.url);
const filePath = path.join(__dirname, '../data/usuarios.json');  
console.log("Ruta calculada del JSON:", filePath);


function obtenerUsuarios() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("Contenido del archivo:", data);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo usuarios.json:", err.message);
    return [];
  }
}

export function obtenerUsuario(email){
  let usuarios=obtenerUsuarios();

  const usuario=usuarios.find((e)=> e.email.toLowerCase()===email.toLowerCase());

  return usuario;

}

export function guardarUsuario(nuevoUsuario) {
  try {
    const usuarios = obtenerUsuarios();
    
    usuarios.push(nuevoUsuario);
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    return false;
  }
}

export function existe(email) {
  const usuarios = obtenerUsuarios();
  return usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function generarID(nuevoUsuario){
  const id=usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

  return id;
}
