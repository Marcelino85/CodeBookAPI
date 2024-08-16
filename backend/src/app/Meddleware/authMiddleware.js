// authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id; // Associa o userId ao request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
export default authMiddleware;