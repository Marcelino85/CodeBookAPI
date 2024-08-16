import { Router } from 'express';
import UserController from '../app/controllers/UserController.js';


const userRoutes = Router();

// ROTAS de Usuário
userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;