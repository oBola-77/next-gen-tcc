import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

export function verificarToken(req, res, next) {
  const token = req.cookies?.authToken; 
  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
}