import { Router } from 'express';
import BookController from '../app/controllers/BookController.js';

const bookRoutes = Router();

// ROTAS (CRUD) para Livros
bookRoutes.get('/livros', BookController.index);
bookRoutes.get('/livros/:id', BookController.show);
bookRoutes.post('/livros', BookController.store);
bookRoutes.put('/livros/:id', BookController.update);
bookRoutes.delete('/livros/:id', BookController.delete);

export default bookRoutes;
