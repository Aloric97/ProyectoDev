
const productoRepository = require('../repositories/productoRepository')


const crearProducto= async (req,res)=>{
    const {nombre,descripcion,stock,precio,imagen}= req.body
    try {
        const productoCreado= await productoRepository.crearProducto(nombre,descripcion,stock,precio,imagen)
        res.status(201).json(productoCreado)
    } catch (error) {

        res.status(500).json(error)
    }
}

const obtenerProductos= async (req,res)=>{
    try {
        const productos= await productoRepository.obtenerProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
}

const obtenerProducto= async (req,res)=>{
    const {id}= req.params
    try {
        const productoEncontrado= await productoRepository.obtenerProducto(id)
        res.status(200).json(productoEncontrado)
    } catch (error) {
        res.status(500).json(error)
    }
}

const actualizarProducto= async (req,res)=>{
    const {id}= req.params
    const {nombre,descripcion,stock,precio,imagen}= req.body
    try {
        const productoActualizado= await productoRepository.actualizarProducto(id,nombre,descripcion,stock,precio,imagen)
        res.status(200).json(productoActualizado)
    } catch (error) {
        res.status(500).json(error)
    }
}

const eliminarProducto= async (req,res)=>{
    const {id}= req.params
    try {
        const productoEliminado= await productoRepository.eliminarProducto(id)
        res.status(200).json(productoEliminado)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}