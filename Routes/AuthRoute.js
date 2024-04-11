const express = require("express");
const router = express.Router();
const {authenticateWithVerify}=require('../authenticationFunction/AuthFonction')

router.post('/',authenticateWithVerify)


module.exports=router;