import jwt from 'jsonwebtoken';

const JWT_SECRET = "seu_segredo_super_secreto"; // Substitua por algo seguro

export function verificarToken(req, res, next) {
  const token = req.cookies?.authToken; // Token armazenado no cookie
  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Armazena os dados decodificados no request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
}