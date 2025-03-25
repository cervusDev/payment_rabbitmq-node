import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido!' });
  };

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(401).json({ error: 'Token inválido ou expirado!' });
  }
};

