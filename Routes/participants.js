const express = require("express");
const router = express.Router();
const { addParticipant,updateParticipant,deleteParticipant,getAllParticipants }=require('../Models/participantModel')


router.post('/add',addParticipant );

router.put('/edit/:id',updateParticipant);

router.delete('/delete/:id',deleteParticipant)

router.get('/getAll',getAllParticipants)

module.exports= router;
