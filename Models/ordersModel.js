const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {textValidator}=require('../validation/TextValidation')
const {dateValidator}=require('../validation/DateValidator')


const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editOrder = async (req, res) => {
  try {
    const { MaterialName, Quantity, DeliveryDate } = req.body;
    const { id } = req.params;

    textValidator(MaterialName,Quantity)
    dateValidator(DeliveryDate)

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { MaterialName, Quantity, DeliveryDate },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addOrder = async (req, res) => {
  try {
    const { MaterialName, Quantity, DeliveryDate, matriculationNumberSadmin } = req.body;

textValidator(MaterialName,Quantity)
dateValidator(DeliveryDate)
textValidator(matriculationNumberSadmin,matriculationNumberSadmin)

    const newOrder = await prisma.order.create({
      data: { MaterialName, Quantity, DeliveryDate, matriculationNumberSadmin },
    });

    res.status(201).json({ message: 'Order added successfully', data: newOrder });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la commande :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllOrders,
  editOrder,
  deleteOrder,
  addOrder
};
