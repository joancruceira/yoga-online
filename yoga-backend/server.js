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
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:4000'], 
  credentials: true
})); 



app.use(express.json());
app.use(cookieParser());


import userRoutes from './routes/user.routes.js';
app.use('/user', userRoutes);
import compra from './routes/rutasProtegidas.routes.js';
app.use('/', compra);


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
