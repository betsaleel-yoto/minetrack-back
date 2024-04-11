const {UserSignup,UserLogin} = require('../Controllers/UserControllers')
const express = require("express");
const router = express.Router();

const {getAll,edit,delet}=require('../Models/userModel')

router.get('',(req,res)=>{
  
});

router.post('/Signup',UserSignup );

router.post('/Login',UserLogin );

router.put('/edit/:imatriculation',edit);

router.delete('/delete/:imatriculation',delet)

router.get('/getAll',getAll)

module.exports= router;
