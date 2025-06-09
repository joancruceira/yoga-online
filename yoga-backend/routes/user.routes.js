import express from 'express';

import { register } from '../controllers/registro.js';

import { loguearse } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loguearse);
router.post('/register', register);


export default router;