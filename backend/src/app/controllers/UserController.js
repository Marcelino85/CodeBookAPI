import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';

class UserController {
  async register(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    // Verificação de senha
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    }

    try {
      // Verificar se o usuário já existe pelo email
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Usuário já existe.' });
      }

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar novo usuário
      const newUser = { username, email, password: hashedPassword };
      await UserRepository.create(newUser);

      // Gerar token JWT
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Retornar token ao frontend
      res.status(201).json({ token, message: 'Usuário criado com sucesso.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verificar se o usuário existe
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
      }

      // Verificar a senha
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Retornar token ao frontend
      res.json({ token, message: 'Login realizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  }
}

export default new UserController();

