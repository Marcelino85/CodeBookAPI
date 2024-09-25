import multer from 'multer';
import BookRepository from "../repositories/BookRepository.js";

// Configuração do multer para armazenamento em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
          const arquivo = req.file; // O arquivo PDF
    
          if (!arquivo) {
            return res.status(400).json({ message: 'Arquivo PDF não enviado.' });
          }
    
          // Agora o arquivo é acessível por `arquivo.buffer`
          const livroComArquivo = {
            ...livro,
            arquivo: arquivo.buffer // Inclui o buffer do arquivo para enviar ao repositório
          };
    
          const row = await BookRepository.create(livroComArquivo, req.userId);
          res.status(201).json({ message: 'Livro adicionado com sucesso!', row });
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

// Exportar o upload configurado para uso nas rotas
export { upload };