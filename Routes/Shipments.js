const express = require("express");
const router = express.Router();
const {
  getAllShipments,
  editShipment,
  deleteShipment,
  addShipment,
  shipmentTask 
}=require("../Models/shipmentModel")

router.get('',(req,res)=>{

})
router.post('/Add',addShipment)
router.delete('/delete/:id',deleteShipment)
router.put('/edit/:id',editShipment)
router.get('/getAll',getAllShipments)

module.exports= router