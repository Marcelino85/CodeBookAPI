import { consulta } from '../database/Conexao.js';

class BookRepository {
  // Criar um novo livro
  async create(book, userId) {
    try {
      const { title, author, synopsis, link, imagelink, audience, arquivo, visibilidade } = book;
      const sql = `
        INSERT INTO books (title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;`;
      return await consulta(sql, [title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade]);
    } catch (error) {
      console.error('Erro ao criar livro:', error.message);
      throw new Error('Erro ao criar livro');
    }
  }

  // Buscar livros de um usuário com paginação
  async findAllByUserId(userId, publico = false, limit = 10, offset = 0) {
    try {
      const sql = publico
      ? `SELECT id, title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade FROM books WHERE visibilidade = 'publico' LIMIT $1 OFFSET $2;`
      : `SELECT id, title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade FROM books WHERE userId = $1 LIMIT $2 OFFSET $3;`;
      return await consulta(sql, publico ? [limit, offset] : [userId, limit, offset]);
    } catch (error) {
      console.error('Erro ao buscar livros do usuário:', error.message);
      throw new Error('Erro ao buscar livros do usuário');
    }
  }

  // Buscar todos os livros públicos com paginação
  async findAllPublicBooks(limit = 10, offset = 0) {
    try {
      const sql = `SELECT id, title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade FROM books WHERE visibilidade = 'publico' LIMIT $1 OFFSET $2;`;
      return await consulta(sql, [limit, offset]);
    } catch (error) {
      console.error('Erro ao buscar livros públicos:', error.message);
      throw new Error('Erro ao buscar livros públicos');
    }
  }

  // Buscar um livro por ID
  async findById(bookId) {
    try {
      const sql = 'SELECT id, title, author, synopsis, link, imagelink, audience, arquivo, userId, visibilidade FROM books WHERE id = $1 LIMIT 1;';
      const result = await consulta(sql, [bookId]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Erro ao buscar livro:', error.message);
      throw new Error('Erro ao buscar livro');
    }
  }

  // Atualizar um livro somente se for do usuário correto
  async update(book, bookId, userId) {
    try {
      const { title, author, synopsis, link, imagelink, audience, visibilidade, arquivo } = book;

      const bookExists = await this.findById(bookId);
      if (!bookExists || bookExists.userId !== userId) {
        throw new Error('Permissão negada para editar este livro');
      }

      let sql = `UPDATE books SET title = $1, author = $2, synopsis = $3, link = $4, imagelink = $5, audience = $6, visibilidade = $7`;
      const values = [title, author, synopsis, link, imagelink, audience, visibilidade];

      if (arquivo) {
        sql += `, arquivo = $8`;
        values.push(arquivo);
      }

      sql += ` WHERE id = $${values.length + 1};`;
      values.push(bookId);

      return await consulta(sql, values);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error.message);
      throw new Error(error.message || 'Erro ao atualizar livro');
    }
  }

  // Remover um livro somente se for do usuário correto
  async delete(bookId, userId) {
    try {
      const bookExists = await this.findById(bookId);
      if (!bookExists || bookExists.userId !== userId) {
        throw new Error('Permissão negada para excluir este livro');
      }
      const sql = 'DELETE FROM books WHERE id = $1;';
      return await consulta(sql, [bookId]);
    } catch (error) {
      console.error('Erro ao deletar livro:', error.message);
      throw new Error(error.message || 'Erro ao deletar livro');
    }
  }
}

export default new BookRepository();
