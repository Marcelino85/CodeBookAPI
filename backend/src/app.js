import express from 'express'
import cors from 'cors';
import userRoutes from './Routes/routeUsers.js';
import bookRoutes from './Routes/routeLivros.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/livros', bookRoutes);

export default app;