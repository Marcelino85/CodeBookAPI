import { Router } from 'express';
import BookController, { upload } from '../app/controllers/BookController.js';
import { authMiddleware } from '../app/Meddleware/authMiddleware.js';

const bookRoutes = Router();

// Aplicando o middleware a todas as rotas (CRUD) de livros
bookRoutes.use(authMiddleware);

bookRoutes.get('/read/:id', BookController.read);
bookRoutes.get('/', BookController.index);  // Lista todos os livros
bookRoutes.get('/:id', BookController.show);  // Mostra um livro específico
bookRoutes.post('/add', upload.single('arquivo'), BookController.store);  // Adiciona livro com arquivo PDF
bookRoutes.put('/update/:id', upload.single('arquivo'), BookController.update); // Atualiza livro específico
bookRoutes.delete('/delete/:id', BookController.delete); // Deleta um livro específico


export default bookRoutes;
