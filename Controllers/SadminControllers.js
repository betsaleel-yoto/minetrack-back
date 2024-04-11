const passport = require('passport');
const jwt = require('jsonwebtoken');
const initializePassport = require('../authenticationFunction/passport-jwt-strategy');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

initializePassport(passport);

const sAdminSignup = async (req, res) => {
  const { matriculationNumber, username } = req.body;
  try {
    const createdAdmin = await prisma.superAdmin.create({
      data: {
        matriculationNumber,
        username
      },
    });
    console.log('SuperAdmin créé avec succès');
    return res.status(201).json({ message: 'SuperAdmin créé avec succès', data: createdAdmin });
  } catch (error) {
    console.error('Erreur lors de la création du SuperAdmin :', error);
    res.status(500).json({ error: 'Erreur lors de la création du SuperAdmin' });
  } finally {
    await prisma.$disconnect();
  }
}


const sAdminLogin = async (req, res) => {
  try {
    // Récupérer matriculationNumber et username depuis le corps de la requête
    const { matriculationNumber, username } = req.body;

    // Rechercher le superAdmin dans la base de données
    const superAdmin = await prisma.superAdmin.findUnique({
      where: {
        matriculationNumber
      }
    });

    // Vérifier si le superAdmin existe et si les informations d'identification correspondent
    if (superAdmin && superAdmin.username === username) {
      // Générer le token avec le matricule du superAdmin
      const token = jwt.sign({
        matriculationNumber: superAdmin.matriculationNumber
      },'zehfgueurfyerfieuyfui', { expiresIn: '24h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Mauvaises informations d\'identification' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion du SuperAdmin :', error);
    return res.status(500).json({ error: 'Erreur lors de la connexion du SuperAdmin' });
  }
}

module.exports = {
  sAdminSignup,
  sAdminLogin
}
