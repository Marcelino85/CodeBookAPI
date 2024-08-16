import 'dotenv/config'; // Carrega as variáveis de ambiente do arquivo .env

import express from 'express'
import cors from 'cors';
import userRoutes from './Routes/routeUsers.js';
import bookRoutes from './Routes/routeLivros.js';
import authMiddleware from './app/Meddleware/authMiddleware.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/livros', authMiddleware, bookRoutes);

export default app;