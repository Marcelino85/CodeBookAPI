// UserController.js

import UserRepository from '../repositories/UserRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

class UserController {

  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Este e-mail já está registrado.' });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hashPassword };

      await userRepository.create(newUser);
      return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  login(req, res) {
    const { username, password } = req.body;

    try {
      userRepository.findByUsername(username, async (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(401).json({ message: 'Usuário não cadastrado. Por favor, registre-se.' });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ user, token });
      });
    } catch (error) {
      return res.status(500).send('Erro no servidor');
    }
  }
}

export default new UserController();
