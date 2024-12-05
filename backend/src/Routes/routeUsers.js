import { Router } from 'express';
import UserController, { upload } from '../app/controllers/UserController.js';
import { authMiddleware } from '../app/Meddleware/authMiddleware.js';

const userRoutes = Router();

// Rota de upload de foto de perfil com autenticação
userRoutes.post('/upload', authMiddleware, upload.single('profilePic'), UserController.uploadProfilePicture);
userRoutes.get('/profile-pic', authMiddleware, UserController.getProfilePicture); // Nova rota para buscar a foto de perfil
// ROTAS de Usuário
userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;