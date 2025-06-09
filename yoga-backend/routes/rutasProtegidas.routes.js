import express from 'express';
import { procesarCompra } from '../controllers/comprar.js';
import { verificarToken } from '../utils/authmiddleware.js';

const rutasProtegidas = express.Router();

rutasProtegidas.post('/compra', verificarToken, procesarCompra);


export default rutasProtegidas;