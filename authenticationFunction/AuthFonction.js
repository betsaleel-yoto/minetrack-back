const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, 'zehfgueurfyerfieuyfui');
    let user;
    if (decoded.matriculationNumber) {
      user = await prisma.SuperAdmin.findUnique({
        where: {
          matriculationNumber: decoded.matriculationNumber
        }
      });
      if (!user) {
        user = await prisma.User.findUnique({
          where: {
            matriculationNumber: decoded.matriculationNumber
          }
        });
      }
    }
    return user || false;
  } catch (err) {
    return false;
  }
};

const authenticateWithVerify = async (req, res, next) => {
  let token;
  // Vérification de la présence du token dans l'en-tête d'autorisation
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Si le token n'est pas trouvé dans l'en-tête, essayez de le trouver dans le corps de la requête
  if (!token && req.body && req.body.token) {
    token = req.body.token;
  }
  if (!token) {
    return res.status(401).json({ message: 'Token manquant. Accès refusé.' });
  }
  const user = await verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Token invalide. Accès refusé.' });
  } if(token){
    return res.status(200).json({message:'authentification réussie'})
  }
  req.user = user;
  next();
};

module.exports = {authenticateWithVerify};
