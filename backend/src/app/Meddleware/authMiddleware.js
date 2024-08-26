import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  console.log('Authorization Header:', authHeader); // Verifique o valor do cabeçalho
  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado.' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extrai o token
    console.log('Token:', token); // Verifique o valor do token

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    req.userId = decoded.id; // Associa o userId ao request

    next();
  } catch (error) {
    console.error('Token verification error:', error); // Exiba o erro para depuração
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
