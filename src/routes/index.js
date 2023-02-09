
const router = require('express').Router();


//routes of the controllers

router.use('/api/product', require('./productoRoute'));
router.use('/api/auth', require('./authRoute'));



module.exports=router