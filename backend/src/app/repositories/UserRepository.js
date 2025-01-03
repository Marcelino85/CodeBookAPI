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

  async updateProfilePicture(userId, profilePicBuffer) {
    const sql = 'UPDATE users SET profilePic = ? WHERE id = ?';
    await consulta(sql, [profilePicBuffer, userId], 'Erro ao atualizar foto de perfil.');
  }

  async findById(userId) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const rows = await consulta(sql, [userId], 'Erro ao buscar usuário pelo ID.');
    return rows[0]; // Retorna o usuário encontrado
  }
}

export default new UserRepository();

