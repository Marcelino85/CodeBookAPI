import { consulta } from '../database/Conexao.js';

export class UserRepository {
  async create(user) {
    const { username, email, password } = user;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const result = await consulta(sql, [username, email, password], 'Erro ao criar usuário.');
    return result;
  }

  async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const rows = await consulta(sql, [email], 'Erro ao buscar usuário pelo email.');
    return rows[0]; // Retorna o primeiro resultado (usuário encontrado)
  }
}

export default new UserRepository();

