import {consulta} from '../database/Conexao.js'

class BookRepository{

    // CRUD
    async create(book, userId) {
        try {
          const { title, author, synopsis, link, imageLink, audience, arquivo } = book;
          const sql = 'INSERT INTO books (title, author, synopsis, link, imageLink, audience, arquivo, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
          return await consulta(sql, [title, author, synopsis, link, imageLink, audience, arquivo, userId]);
        } catch (error) {
          console.error('Erro no método create:', error.message);
          throw new Error('Erro ao criar livro');
        }
      }

    async findAllByUserId(userId){
        try {
            const sql = `SELECT * FROM books WHERE userId = ?;`;
            return await consulta(sql, [userId]);
            
        } catch (error) {
            console.error('Erro no método findAllByUserId:', error.message);
            throw new Error('Erro ao buscar do usuário');
        }
    }

    async findById (userId, callback){
        try {
            const sql = 'SELECT * FROM books WHERE userId = ?';
            return await consulta(sql, [userId], callback);
        } catch (error) {
            console.error('Erro no método findById:', error.message);
            throw new Error('Erro ao buscar livro');
        }
    }

    async update(book, id, callback){
        try {
            const { title, author, synopsis, link, imageLink, audience } = book;
            const sql = 'UPDATE books SET title = ?, author = ?, synopsis = ?, link = ?, imageLink = ?, audience = ? WHERE id = ?';
            return await consulta(sql, [title, author, synopsis, link, imageLink, audience, id], callback);
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