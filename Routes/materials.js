const express = require("express");
const router = express.Router();
const {getAll,edit,delet,addMaterial}=require('../Models/materialsModel.js')


router.get('/getAll',getAll)
router.post('/Create',addMaterial)
router.delete('/delete/:id',delet)
router.put('/edit/:id',edit)

module.exports= router