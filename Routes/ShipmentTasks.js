const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  delet,
  add
}=require('../Models/ShipmentTaskModel')

router.get('/getAll',getAll)
router.post('/Create',add)
router.delete('/delete/:id',delet)
router.put('/edit/:id',edit)

module.exports= router