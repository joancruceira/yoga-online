import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], 
  credentials: true
})); 



app.use(express.json());
app.use(cookieParser());


import userRoutes from './routes/user.routes.js';
app.use('/user', userRoutes);
import compra from './routes/rutasProtegidas.routes.js';
app.use('/compra', compra);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
