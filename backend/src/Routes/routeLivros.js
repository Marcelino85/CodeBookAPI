import { Router } from 'express';
import BookController from '../app/controllers/BookController.js';
import { authMiddleware } from '../app/Meddleware/authMiddleware.js'

const bookRoutes = Router();

// Aplicando o middleware a todas as rotas (CRUD) de livros
bookRoutes.use(authMiddleware);

bookRoutes.get('/', BookController.index);
bookRoutes.get('/:id', BookController.show);
bookRoutes.post('/', BookController.store);
bookRoutes.put('/:id', BookController.update);
bookRoutes.delete('/:id', BookController.delete);

export default bookRoutes;