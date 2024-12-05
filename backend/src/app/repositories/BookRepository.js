import {consulta} from '../database/Conexao.js'

class BookRepository{

    // CRUD
    async create(book, userId) {
        try {
          const { title, author, synopsis, link, imageLink, audience, arquivo, visibilidade  } = book;
          const sql = 'INSERT INTO books (title, author, synopsis, link, imageLink, audience, arquivo, userId, visibilidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
          return await consulta(sql, [title, author, synopsis, link, imageLink, audience, arquivo, userId, visibilidade ]);
        } catch (error) {
          console.error('Erro no método create:', error.message);
          throw new Error('Erro ao criar livro');
        }
      }

    async findAllByUserId(userId,  publico = false){
        try {
            const sql = publico ? 
            `SELECT * FROM books WHERE visibilidade = 'publico'` : 
            `SELECT * FROM books WHERE userId = ?;`;
            return await consulta(sql, publico ? [] : [userId]);
        } catch (error) {
            console.error('Erro no método findAllByUserId:', error.message);
            throw new Error('Erro ao buscar do usuário');
        }
    }

    //Método para buscar todos os livros públicos:
    async findAllPublicBooks() {
      try {
          const sql = `SELECT * FROM books WHERE visibilidade = 'publico';`;
          return await consulta(sql);
      } catch (error) {
          console.error('Erro no método findAllPublicBooks:', error.message);
          throw new Error('Erro ao buscar livros públicos');
      }
    }
  

    async findById(bookId) {
      try {
          const sql = 'SELECT * FROM books WHERE id = ? LIMIT 1';
          const result = await consulta(sql, [bookId]);
  
          // Verifica se há um livro na resposta e retorna o primeiro item ou null
          return result.length > 0 ? result[0] : null;
      } catch (error) {
          console.error('Erro no método findById:', error.message);
          throw new Error('Erro ao buscar livro');
      }
  }
  
  
      

      async update(book, id) {
        try {
          const { title, author, synopsis, link, imageLink, audience, visibilidade, arquivo } = book;
          let sql = 'UPDATE books SET title = ?, author = ?, synopsis = ?, link = ?, imageLink = ?, audience = ?, visibilidade = ?';
          const values = [title, author, synopsis, link, imageLink, audience, visibilidade];
      
          if (arquivo) {
            sql += ', arquivo = ?';
            values.push(arquivo);
          }
      
          sql += ' WHERE id = ?';
          values.push(id);
      
          return await consulta(sql, values);
        } catch (error) {
          console.error('Erro no método update:', error.message);
          throw new Error('Erro ao atualizar livro');
        }
      }
      

    async delete(id, callback){
        try {
            const sql = 'DELETE FROM books WHERE id = ?';
            return await consulta(sql, [id], callback);
        } catch (error) {
            console.error('Erro no método delete:', error.message);
            throw new Error('Erro ao deletar livro');
        }
    }
}

export default new BookRepository;