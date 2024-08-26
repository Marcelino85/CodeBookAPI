import { Router } from 'express';
import BookController from '../app/controllers/BookController.js';
import { authMiddleware } from '../app/Meddleware/authMiddleware.js'

const bookRoutes = Router();

// Aplicando o middleware a todas as rotas (CRUD) de livros
bookRoutes.use(authMiddleware);

bookRoutes.get('/', BookController.index);  // Lista todos os livros
bookRoutes.get('/:id', BookController.show);  // Mostra um livro específico
bookRoutes.post('/add', BookController.store); // Adiciona um novo livro (ajuste aqui)
bookRoutes.put('/update/:id', BookController.update);  // Atualiza um livro específico
bookRoutes.delete('/delete/:id', BookController.delete); // Deleta um livro específico

export default bookRoutes;