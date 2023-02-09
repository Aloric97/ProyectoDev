
const producto= require('../models/productoModel');

//importando manejo de error generales
const AppError = require('../utils/AppError')


const crearProducto= async (nombre,descripcion,stock,precio,imagen)=>{
    
    if(!(nombre && stock && precio)){
        throw new AppError('los campos nombre, stock y precio no pueden ser nulos',400,1)
    }
    try {
        const productoCreado= await producto.create({
            nombre,
            descripcion,
            stock,
            precio,
            imagen
        })

        return productoCreado

    } catch (error) {
        throw new AppError(`error:${error}`,403,2)
    }
}

const obtenerProductos= async ()=>{
    try {
        const productos= await producto.findAll()
        return productos
    } catch (error) {
        throw new AppError("error:",error)
    }
}

const obtenerProducto= async (id)=>{


    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            return productoEncontrado
        }else{
            throw new AppError("no se ha encontrado el producto")
        }

    } catch (error) {
        throw new AppError(`${error}`,400,2)
    }
}

const actualizarProducto= async (id,nombre,descripcion,stock,precio,imagen)=>{
    
    if(!id){
        throw new AppError('el id no puede ser nulo',400,1)
    }

    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            const productoActualizado= await productoEncontrado.update({
                nombre,
                descripcion,
                stock,
                precio,
                imagen
            })

            return productoActualizado
        }else{
            throw new AppError("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new AppError(`${error}`,400,2)
    }
}

const eliminarProducto= async (id)=>{
    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            const productoEliminado= await productoEncontrado.destroy()
            return productoEliminado
        }else{
            throw new AppError("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new AppError(`${error}`,400,2)
    }
}

const descontarStock= async (id,cantidad)=>{
    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            const productoActualizado= await productoEncontrado.update({
                stock:productoEncontrado.stock-cantidad
            })
            return productoActualizado
        }else{
            throw new AppError("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new AppError(`${error}`,400,2)
    }
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}