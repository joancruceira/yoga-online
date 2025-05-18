import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para que el frontend se pueda comunicar



app.use(express.json());

import userRoutes from './routes/user.routes.js';
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
