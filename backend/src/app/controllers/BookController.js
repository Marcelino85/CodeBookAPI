import multer from 'multer';
import BookRepository from "../repositories/BookRepository.js";

// Configuração do multer para armazenamento em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class BookController{

  //Modifiquei o método index para que ele retorne todos os livros públicos, além dos livros privados do usuário autenticado.
    async index(req, res) {
      try {
          // Buscar livros do usuário logado e todos os livros públicos
          const userBooks = await BookRepository.findAllByUserId(req.userId);
          const publicBooks = await BookRepository.findAllPublicBooks();

          // Combinar as listas, removendo duplicatas se necessário
          const allBooks = [...userBooks, ...publicBooks.filter(pb => !userBooks.find(ub => ub.id === pb.id))];

          res.json(allBooks);
      } catch (error) {
          console.error('Erro no método index:', error.message);
          res.status(500).json({ error: 'Erro ao buscar livros' });
      }
    }

    async show(req, res) {
      try {
          const bookId = req.params.id;  // Pega o ID do livro na URL
          const book = await BookRepository.findById(bookId);
  
          if (!book) {
              return res.status(404).json({ message: 'Livro não encontrado' });
          }
  
          res.json(book); // Retorna o objeto único do livro (req.userId - findById - [array]
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
            arquivo: arquivo.buffer, // Inclui o buffer do arquivo para enviar ao repositório
            visibilidade: livro.visibilidade  // Define o padrão caso não seja enviado do frontend
          };
          console.log('Dados do livro:', livroComArquivo);
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
          const { title, author, synopsis, link, imagelink, audience, visibilidade } = req.body;
          const arquivo = req.file ? req.file.buffer : null; // Verifica se um novo arquivo foi enviado
      
          const updatedBook = { title, author, synopsis, link, imagelink, audience, visibilidade, arquivo };
          const rows = await BookRepository.update(updatedBook, id);
          res.json({ message: 'Livro atualizado com sucesso!', rows });
        } catch (error) {
          console.error('Erro no método update:', error.message);
          res.status(500).json({ error: 'Erro ao atualizar livro' });
        }
      }
      
      
      

    // Nova função no BookController
    async read(req, res) {
      try {
          const bookId = req.params.id;
          console.log("Book ID para leitura:", bookId); // Log para verificar o ID recebido
  
          // Buscar o livro pelo ID e garantir que o campo 'arquivo' seja retornado
          const book = await BookRepository.findById(bookId);
          
          if (!book || !book.arquivo) {
              return res.status(404).json({ message: 'Livro ou arquivo PDF não encontrado.' });
          }
  
          const pdfBuffer = Buffer.from(book.arquivo); // Buffer do PDF
  
          // Define cabeçalhos para exibir o PDF
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename="livro.pdf"');
  
          res.send(pdfBuffer); // Enviar o PDF como resposta
      } catch (error) {
          console.error('Erro ao buscar o PDF:', error.message);
          res.status(500).json({ error: 'Erro ao buscar o PDF.' });
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