
const router = require('express').Router();
const isUser = require('../middlewares/isUser');


//routes of the controllers

router.get('/', isUser,(req, res) => {
    res.send('Bienvenido a la api')
})

router.use('/api/product', require('./productoRoute'));
router.use('/api/auth', require('./authRoute'));
router.use('/api/user', require('./usuarioRoute'));



module.exports=router