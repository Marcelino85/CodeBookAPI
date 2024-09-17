
import { consulta } from '../database/Conexao.js';
import conexao from '../database/Conexao.js';

export class UserRepository {
    create(user) {
    const { username, password } = user;
     try {
      const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const results = conexao.query(sql, [username, password]);
      console.log('Usuário registrado com sucesso');
      return results;
  } catch (error) {
      console.error('Erro no método create:', error.message);
      throw new Error('Erro ao criar usuário.');
    }
  }

  findByEmail(email, callback){
    
    try {
      const sql = 'SELECT * FROM users WHERE email = ?';
      const rows = conexao.query(sql, [email], callback);
      return rows;  
    } catch (error) {
      console.error('Erro no método findByEmail:', error.message);
      throw new Error('Erro ao logar usuário.');
    }
  }
}

export default UserRepository;
