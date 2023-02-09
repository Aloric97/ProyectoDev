
const router = require('express').Router();

const productoController = require('../controllers/productoController');

router.get('/', productoController.obtenerProductos);
router.post('/', productoController.crearProducto);
router.get('/:id', productoController.obtenerProducto);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;


