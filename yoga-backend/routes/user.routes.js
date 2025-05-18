import express from 'express';
import { loginUser } from '../controllers/auth.js';
import { registerUser } from '../controllers/registro.js';
import { procesarCompra } from '../controllers/comprar.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/compra', procesarCompra); 

export default router;