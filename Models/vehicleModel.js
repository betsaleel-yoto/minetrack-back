const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {textValidator}=require('../validation/TextValidation')
const {dateValidator}=require('../validation/DateValidator')


const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editVehicle = async (req, res) => {
  try {
    const { VehicleRegistrationNumber,VehicleName, VehicleCondition, MaintenanceDate } = req.body;
    const { RegistrationNumber } = req.params;

//Validation

textValidator(VehicleCondition,VehicleCondition)
dateValidator(MaintenanceDate)


    const updatedVehicle = await prisma.vehicle.update({
      where: { VehicleRegistrationNumber: RegistrationNumber},
      data: { VehicleRegistrationNumber,VehicleName, VehicleCondition, MaintenanceDate },
    });

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { RegistrationNumber } = req.params;
    await prisma.vehicle.delete({ where: {VehicleRegistrationNumber: RegistrationNumber } });

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addVehicle = async (req, res) => {
  try {
    const { VehicleRegistrationNumber, VehicleName, VehicleCondition, MaintenanceDate, matriculationNumberSadmin } = req.body;
//Validations

textValidator(VehicleRegistrationNumber,VehicleName)



    const newVehicle = await prisma.vehicle.create({
      data: { VehicleRegistrationNumber, VehicleName, VehicleCondition, MaintenanceDate, matriculationNumberSadmin },
    });

    res.status(201).json({ message: 'Vehicle added successfully', VehicleRegistrationNumber: newVehicle.VehicleRegistrationNumber });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du véhicule :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  getAllVehicles,
  editVehicle,
  deleteVehicle,
  addVehicle
};
