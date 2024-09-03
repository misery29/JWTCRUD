const axios = require('axios');

const JWT_SERVICE_URL = 'http://jwt_service:3000';  // URL do serviço JWT

// Middleware para autenticar e verificar token JWT
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extrai o token do cabeçalho Authorization
  if (!token) {
    console.log('Token is missing in Authorization header');
    return res.status(401).json({ error: 'Token format is incorrect' });
  }

  console.log('Token received:', token);  // Log do token recebido

  try {
    // Chama o serviço JWT para verificar o token
    const response = await axios.get(`${JWT_SERVICE_URL}/auth/verifyToken`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Token verified successfully:', response.data);  // Log da resposta do serviço JWT
    req.user = response.data;  // Salva informações do usuário na requisição
    next();  // Passa para o próximo middleware ou controlador
  } catch (error) {
    console.error('Error verifying token:', error.response ? error.response.data : error.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
