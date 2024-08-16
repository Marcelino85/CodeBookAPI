import BookRepository from "../repositories/BookRepository.js";

class BookController{
    async index(req, res) {
        try {
           
            const row = await BookRepository.findAllByUserId(req.userId);
            res.json(row);
        } catch (error) {
            console.error('Erro no método index:', error.message);
            res.status(500).json({ error: 'Erro ao buscar livros' });
        }
    }

    async show(req, res) {
        try {
            
            const row = await BookRepository.findById(req.userId, (err, results) => {
                if (err) return res.status(500).send('Server error');
                res.json(results);
              });
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
            const row = await BookRepository.create(livro, req.userId, (err, res) => {
                if (err) return res.status(500).send('Server error');
                res.status(201).send('Book added!');
              });
            res.json(row);
        } catch (error) {
            console.error('Erro no método store:', error.message);
            res.status(500).json({ error: 'Erro ao criar livro' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { title, author, synopsis, link, imageLink, audience } = req.body; // Desestruture os campos necessários do req.body
            console.log('Dados recebidos no update:', { id, title, author, synopsis, link, imageLink, audience });

            const updatedBook = { title, author, synopsis, link, imageLink, audience };
            const rows = await BookRepository.update(updatedBook, id);
            res.json(rows);
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