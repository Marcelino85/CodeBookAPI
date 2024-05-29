import BookRepository from "../repositories/BookRepository.js";

class BookController{
    async index(req, res) {
        try {
            const row = await BookRepository.findAll();
            res.json(row);
        } catch (error) {
            console.error('Erro no método index:', error.message);
            res.status(500).json({ error: 'Erro ao buscar livros' });
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const row = await BookRepository.findById(id);
            res.json(row);
        } catch (error) {
            console.error('Erro no método show:', error.message);
            res.status(500).json({ error: 'Erro ao buscar livro por ID' });
        }
    }

    async store(req, res) {
        try {
            const livro = req.body;
            console.log('Dados recebidos no store:', livro); // Adicionei este log
            const row = await BookRepository.create(livro);
            res.json(row);
        } catch (error) {
            console.error('Erro no método store:', error.message);
            res.status(500).json({ error: 'Erro ao criar livro' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const livro = req.body;
            console.log('Dados recebidos no update:', { id, livro }); // Adicione este log
            const row = await BookRepository.update(livro, id);
            res.json(row);
        } catch (error) {
            console.error('Erro no método update:', error.message);
            res.status(500).json({ error: 'Erro ao atualizar livro' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const row = await BookRepository.delete(id);
            res.json(row);
        } catch (error) {
            console.error('Erro no método delete:', error.message);
            res.status(500).json({ error: 'Erro ao deletar livro' });
        }
    }
}

export default new BookController();