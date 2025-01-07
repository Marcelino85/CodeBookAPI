import { consulta } from '../database/Conexao.js';

export class UserRepository {
  // Criar um novo usuário
  async create(user) {
    const { username, email, password } = user;
    const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const result = await consulta(sql, [username, email, password], 'Erro ao criar usuário.');
    return result[0]; // Retorna o usuário criado
  }

  // Buscar usuário pelo email
  async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const rows = await consulta(sql, [email], 'Erro ao buscar usuário pelo email.');
    return rows[0]; // Retorna o primeiro usuário encontrado
  }

  // Atualizar foto de perfil
  async updateProfilePicture(userId, profilePicBuffer) {
    const sql = 'UPDATE users SET profilePic = $1 WHERE id = $2';
    await consulta(sql, [profilePicBuffer, userId], 'Erro ao atualizar foto de perfil.');
  }

  // Buscar usuário pelo ID
  async findById(userId) {
    const sql = 'SELECT * FROM users WHERE id = $1';
    const rows = await consulta(sql, [userId], 'Erro ao buscar usuário pelo ID.');
    return rows[0]; // Retorna o usuário encontrado
  }
}

export default new UserRepository();
