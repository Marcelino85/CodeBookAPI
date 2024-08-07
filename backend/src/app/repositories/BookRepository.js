import {consulta} from '../database/Conexao.js'

class BookRepository{

    // CRUD
    async create(livro){
        try {
            const sql = `INSERT INTO tbl_livros SET ?;`
            return await consulta(sql, livro, 'Não foi possivel cadastrar.')

        } catch (error) {
            console.error('Erro no método create:', error.message);
            throw new Error('Erro ao criar livro');
        }
    }

    async findAll(){
        try {
            const sql = `SELECT * FROM tbl_livros;`;
            return await consulta(sql, 'Não foi possivel Localizar');
        } catch (error) {
            console.error('Erro no método findAll:', error.message);
            throw new Error('Erro ao buscar livros');
        }
    }

    async findById (id){
        try {
            const sql = `SELECT * FROM tbl_livros WHERE id=?;`;
            return await consulta(sql, id, 'Não foi possivel Localizar');
        } catch (error) {
            console.error('Erro no método findById:', error.message);
            throw new Error('Erro ao buscar livro');
        }
    }

    async update(livro, id){
        try {
            const sql = `UPDATE tbl_livros SET ? WHERE id=?;`;
            return await consulta(sql, [livro, id], 'Não foi possivel Atualizar');
        } catch (error) {
            console.error('Erro no método update:', error.message);
            throw new Error('Erro ao atualizar livro');
        }
    }

    async delete(id){
        try {
            const sql = `DELETE FROM tbl_livros WHERE id=?;`;
            return await consulta(sql, id, 'Não foi possivel Apagar!');
        } catch (error) {
            console.error('Erro no método delete:', error.message);
            throw new Error('Erro ao deletar livro');
        }
    }
}

export default new BookRepository;