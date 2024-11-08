import { Router } from 'express';
import UserController, { upload } from '../app/controllers/UserController.js';
import { authMiddleware } from '../app/Meddleware/authMiddleware.js';

const userRoutes = Router();

// Rota de upload de foto de perfil com autenticação
userRoutes.post('/upload', authMiddleware, upload.single('profilePic'), UserController.uploadProfilePicture);

// ROTAS de Usuário
userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;