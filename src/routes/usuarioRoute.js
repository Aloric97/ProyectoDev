
const router = require('express').Router()

const {obtenerUsuarios,obtenerUsuario} = require('../controllers/usuarioController')

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuario)

module.exports = router