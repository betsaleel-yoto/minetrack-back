const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour récupérer ParticipantRole à partir de ParticipantName
const getParticipantRole = async (participantName) => {
  try {
    // Recherchez l'utilisateur avec ParticipantName correspondant
    const user = await prisma.User.findUnique({
      where: {
        UserName: participantName
      }
    });

    // Si l'utilisateur est trouvé, retournez son UserTitle comme ParticipantRole
    if (user) {
      return user.UserTitle;
    } else {
      // Si l'utilisateur n'est pas trouvé, retournez une valeur par défaut ou null selon votre logique
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Route pour ajouter un participant
const addParticipant = async (req, res) => {
  try {
    const { ParticipantName,ShipmentId } = req.body;

    // Récupérez ParticipantRole en utilisant la fonction getParticipantRole
    const ParticipantRole = await getParticipantRole(ParticipantName);

    // Créez un nouveau participant en utilisant la méthode create de Prisma
    const participant = await prisma.Participant.create({
      data: {
        ParticipantName,
        ParticipantRole,
        ShipmentId
      },
    });

    res.status(201).json({
      message: 'Participant added successfully',
      ParticipantName: participant.ParticipantName,
      ParticipantRole: participant.ParticipantRole
    });
  } catch (error) {
    console.error('Error adding participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Route pour mettre à jour un participant
const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { ParticipantName } = req.body;

    // Récupérez ParticipantRole en utilisant la fonction getParticipantRole
    const ParticipantRole = await getParticipantRole(ParticipantName);

    // Mettez à jour le participant en utilisant la méthode update de Prisma
    const updatedParticipant = await prisma.Participant.update({
      where: {
        id: parseInt(id) // Assurez-vous de convertir l'ID en nombre si nécessaire
      },
      data: {
        ParticipantName: ParticipantName,
        ParticipantRole: ParticipantRole
      },
    });

    res.status(200).json({
      message: 'Participant updated successfully',
      ParticipantName: updatedParticipant.ParticipantName,
      ParticipantRole: updatedParticipant.ParticipantRole
    });
  } catch (error) {
    console.error('Error updating participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Route pour supprimer un participant
const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimez le participant en utilisant l'ID
    await prisma.Participant.delete({
      where: {
        id: parseInt(id) // Assurez-vous de convertir l'ID en nombre si nécessaire
      }
    });

    res.status(200).json({ message: 'Participant deleted successfully' });
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllParticipants = async (req, res) => {
  try {
    // Récupérez tous les participants en utilisant la méthode findMany de Prisma
    const participants = await prisma.Participant.findMany();

    res.status(200).json(participants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addParticipant,updateParticipant,deleteParticipant,getAllParticipants };
