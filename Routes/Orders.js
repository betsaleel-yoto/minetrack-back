const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  editOrder,
  deleteOrder,
  addOrder
}=require('../Models/ordersModel')

router.get('/getAll',getAllOrders)
router.post('/Add',addOrder)
router.delete('/delete/:id',deleteOrder)
router.put('/edit/:id',editOrder)

module.exports= router