
const productoRepository = require('../repositories/productoRepository')


const crearProducto= async (req,res)=>{
    try {
        const {nombre,descripcion,stock,precio,imagen}= req.body
        const productoCreado= await productoRepository.crearProducto(nombre,descripcion,stock,precio,imagen)
        res.status(201).json({message:'se ha creado el producto:',producto:productoCreado})

    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

const obtenerProductos= async (req,res)=>{
    try {
        const productos= await productoRepository.obtenerProductos()
        res.status(200).json(productos)
    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

const obtenerProducto= async (req,res)=>{
    const {id}= req.params
    try {
        const productoEncontrado= await productoRepository.obtenerProducto(id)
        res.status(200).json(productoEncontrado)
    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

const actualizarProducto= async (req,res)=>{
    const {id}= req.params
    const {nombre,descripcion,stock,precio,imagen}= req.body
    try {
        const productoActualizado= await productoRepository.actualizarProducto(id,nombre,descripcion,stock,precio,imagen)
        res.status(200).json({message:'producto actualizado:', producto:productoActualizado})
    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

const eliminarProducto= async (req,res)=>{
    const {id}= req.params
    try {
        const productoEliminado= await productoRepository.eliminarProducto(id)
        res.status(200).json({message:'se ha eliminado el producto:',producto:productoEliminado})
    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}