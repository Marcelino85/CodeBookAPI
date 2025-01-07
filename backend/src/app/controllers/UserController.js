import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import multer from 'multer';

// Configuração do multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class UserController {
  async register(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    }

    try {
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Usuário já existe.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hashedPassword };
      const createdUser = await UserRepository.create(newUser);

      const token = jwt.sign(
        { id: createdUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({ token, message: 'Usuário criado com sucesso.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, message: 'Login realizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  }

  async getProfilePicture(req, res) {
    try {
      const userId = req.userId;

      const user = await UserRepository.findById(userId);
      if (user && user.profilePic) {
        res.setHeader('Content-Type', 'image/jpeg'); // Ajuste para o tipo correto
        res.end(Buffer.from(user.profilePic, 'binary'));
      } else {
        res.status(404).json({ message: 'Foto de perfil não encontrada.' });
      }
    } catch (error) {
      console.error('Erro ao buscar a foto de perfil:', error.message);
      res.status(500).json({ message: 'Erro ao buscar a foto de perfil.' });
    }
  }

  async uploadProfilePicture(req, res) {
    try {
      const userId = req.userId;
      const profilePic = req.file;

      if (!profilePic) {
        return res.status(400).json({ message: 'Nenhuma foto enviada.' });
      }

      await UserRepository.updateProfilePicture(userId, profilePic.buffer);

      res.status(200).json({ message: 'Foto de perfil atualizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao fazer upload da foto de perfil:', error.message);
      res.status(500).json({ message: 'Erro ao fazer upload da foto de perfil.' });
    }
  }
}

export { upload };
export default new UserController();
