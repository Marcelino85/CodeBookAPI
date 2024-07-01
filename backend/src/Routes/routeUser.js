import { Router } from "express";
import BookController from "../app/controllers/BookController.js";

const routes = Router()

// ROTAS (CRUD)
routes.get('/livros', userController)
routes.get('/livros/:id', BookController.show)
routes.post('/livros', BookController.store)
routes.put('/livros/:id', BookController.update)
routes.delete('/livros/:id',BookController.delete)

export default routes;
