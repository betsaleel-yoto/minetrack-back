const express = require("express");
const router = express.Router();
const  {
  getAllVehicles,
  editVehicle,
  deleteVehicle,
  addVehicle
}=require('../Models/vehicleModel');

router.post('/Add',addVehicle)
router.delete('/delete/:RegistrationNumber',deleteVehicle)
router.put('/edit/:RegistrationNumber',editVehicle)
router.get('/getAll',getAllVehicles)
module.exports= router