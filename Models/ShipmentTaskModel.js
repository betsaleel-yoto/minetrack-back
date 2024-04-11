const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const tasks = await prisma.ShipmentTasks.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des taches :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const edit = async (req, res) => {
  try {
    const { TaskDescription, Taskstate} = req.body;
    const { id } = req.params;

    const updatedtask = await prisma.ShipmentTasks.update({
      where: { id: parseInt(id) },
      data: { TaskDescription, Taskstate},
    });

    res.status(200).json(updatedtask);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'envoi :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const delet = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.ShipmentTasks.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: 'ShipmentTask deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'envoi :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const add = async (req, res) => {
  try {
    const  { id, TaskDescription, Taskstate, ShipmentId }= req.body;

    const newTask = await prisma.ShipmentTasks.create({
      data: { id, TaskDescription, Taskstate, ShipmentId },
    });

    res.status(201).json({ message: 'ShipmentTask added successfully', data: newTask });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'envoi :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  edit,
  delet,
  add
};
