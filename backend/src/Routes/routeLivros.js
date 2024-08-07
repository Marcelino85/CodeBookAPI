import { Router } from 'express';
import BookController from '../app/controllers/BookController.js';

const bookRoutes = Router();

// ROTAS (CRUD) para Livros
bookRoutes.get('/', BookController.index);
bookRoutes.get('/:id', BookController.show);
bookRoutes.post('/', BookController.store);
bookRoutes.put('/:id', BookController.update);
bookRoutes.delete('/:id', BookController.delete);

export default bookRoutes;