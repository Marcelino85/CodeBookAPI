import UserRepository from '../repositories/UserRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const userRepository = new UserRepository();

class UserController {

  async register(req, res) {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = { username, password:hashPassword };
    
    try {
      // return res.status(500).send('Erro no servidor');
      const results = userRepository.create(newUser);
      res.status(201).json({ message: 'Usuário criado com sucesso!'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  login(req, res) {
    const { username, password } = req.body;
   
    try {
        userRepository.findByUsername(username, (err, results) => {
          console.log(results[0])
        if (err) {
          console.error('Erro ao buscar usuário:', err);
          return res.status(500).send('Erro no servidor');
        }
        if (results.length === 0) {
          return res.status(401).json({ message: 'Usuário não cadastrado. Por favor, registre-se.' });
        }

        const user = results[0];
        console.log("Usuário logado!")
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
          user: results[0],
          token: token
         });
     
      });
    } catch (error) {
      console.error('Erro no método login:', error);
      return res.status(500).send('Erro no servidor');
    }
  }
}

export default new UserController();