const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {textValidator}=require('../validation/TextValidation')

const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await prisma.itinerary.findMany();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Erreur lors de la récupération des itinéraires :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editItinerary = async (req, res) => {
  try {
    const { RouteName, RouteDescription, RelatedMaterial } = req.body;
    const { id } = req.params;

//Validation

  textValidator(RouteName,RouteDescription)
  textValidator(RelatedMaterial,RelatedMaterial)

    const updatedItinerary = await prisma.itinerary.update({
      where: { id: parseInt(id) },
      data: { RouteName, RouteDescription, RelatedMaterial },
    });

    res.status(200).json(updatedItinerary);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'itinéraire :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.itinerary.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'itinéraire :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addItinerary = async (req, res) => {
  try {
    const { RouteName, RouteDescription, RelatedMaterial, matriculationNumberSadmin } = req.body;
//Validations

    textValidator(RouteName,RouteDescription)
    textValidator(RelatedMaterial,matriculationNumberSadmin)

    const newItinerary = await prisma.itinerary.create({
      data: { RouteName, RouteDescription, RelatedMaterial, matriculationNumberSadmin },
    });

    res.status(201).json({ message: 'Itinerary added successfully', data: newItinerary });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'itinéraire :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllItineraries,
  editItinerary,
  deleteItinerary,
  addItinerary
};
