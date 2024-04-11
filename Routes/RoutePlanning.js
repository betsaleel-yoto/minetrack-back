const express = require("express");
const router = express.Router();
const {
  getAllItineraries,
  editItinerary,
  deleteItinerary,
  addItinerary
}=require('../Models/RoutesPlanningModel')

router.get('',(req,res)=>{

})
router.post('/Add',addItinerary)
router.delete('/delete/:id',deleteItinerary)
router.put('/edit/:id',editItinerary)
router.get('/getAll',getAllItineraries)

module.exports= router