import express from 'express';

import { register } from '../controllers/registro.js';

import { loguearse } from '../controllers/auth.js';

import { verificarToken } from '../utils/authmiddleware.js';

const router = express.Router();

router.post('/login', loguearse);
router.post('/register', register);
router.get('/verificar', verificarToken, (req, res) => {
res.json({ message: "Token válido", user: req.user });
});

export default router;