import express from 'express';
import { procesarCompra } from '../controllers/comprar.js';
import { verificarToken } from '../utils/authmiddleware.js';

const rutasProtegidas = express.Router();

rutasProtegidas.post('/compra', verificarToken, procesarCompra);

rutasProtegidas.get('/me', verificarToken, (req, res) => {
  const { id, email, nombre, membresia_activa } = req.user;
  res.json({ id, email, nombre, membresia_activa });
});

export default rutasProtegidas;