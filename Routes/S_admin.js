const express = require("express");
const router = express.Router();
const {sAdminSignup,sAdminLogin}=require('../Controllers/SadminControllers')
const {getAll,edit,delet}=require('../Models/sAdminModel')

router.get('/getAll',getAll)

router.post('/Signup',sAdminSignup)

router.post('/Login', sAdminLogin);


router.put('/edit/:imatriculation',edit)

router.delete('/delete/:imatriculation',delet)

module.exports= router
