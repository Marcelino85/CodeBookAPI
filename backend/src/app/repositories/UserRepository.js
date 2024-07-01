// const connection = require('../database/Conexao.js');
const bcrypt = require('bcryptjs');
import {consulta} from '../database/Conexao.js'

class UserRepository{
        
    async create(user, callback) {
      try{

        const { username, password } = user;
        bcrypt.hash(password, 10,  async (err, hash) => {
          if (err) throw err;
          const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
          return await consulta(sql, [username, hash], callback);
        });
      } catch(error){
        console.error('Erro no método create:', error.message);
            throw new Error('Erro ao criar Usuário');
      }
    };
    
    async findByUsername(username, callback){
      try{
        const sql = 'SELECT * FROM usuarios WHERE username = ?';
        return await consulta(sql, [username], callback);
      }catch(error){}
    };
    
  };
module.exports = UserRepository;
