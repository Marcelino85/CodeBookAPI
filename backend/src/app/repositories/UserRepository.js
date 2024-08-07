
import { consulta } from '../database/Conexao.js';
import conexao from '../database/Conexao.js';

class UserRepository {
    create(user) {
    const { username, password } = user;
     try {
      const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
      const results = conexao.query(sql, [username, password]);
      console.log('Usuário registrado com sucesso');
      return results;
  } catch (error) {
      console.error('Erro no método create:', error.message);
      throw new Error('Erro ao criar usuário.');
    }
  }

  findByUsername(username, callback){
    
    try {
      const sql = 'SELECT * FROM usuarios WHERE username = ?';
      const rows = conexao.query(sql, [username], callback);
      return rows;
    } catch (error) {
      console.error('Erro no método findByUsername:', error.message);
      throw new Error('Erro ao logar usuário.');
    }
  }
}

export default UserRepository;
