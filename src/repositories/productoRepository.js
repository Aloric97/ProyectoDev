
const producto= require('../models/producto');


const crearProducto= async (nombre,descripcion,stock,precio,imagen)=>{
    
    if(!(nombre && stock && precio)){
        throw new Error('los campos nombre, stock y precio no pueden ser nulos')
    }
    try {
        const productoCreado= await producto.create({
            nombre,
            descripcion,
            stock,
            precio,
            iva:producto.iva,
            imagen
        })

        return productoCreado

    } catch (error) {
        throw new Error("error:",error)
    }
}

const obtenerProductos= async ()=>{
    try {
        const productos= await producto.findAll()
        return productos
    } catch (error) {
        throw new Error("error:",error)
    }
}

const obtenerProducto= async (id)=>{
    try {
        const productoEncontrado= await producto.findByPk(id)
        return productoEncontrado
    } catch (error) {
        throw new Error("error:",error)
    }
}

const actualizarProducto= async (id,nombre,descripcion,stock,precio,imagen)=>{
    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            const productoActualizado= await productoEncontrado.update({
                nombre,
                descripcion,
                stock,
                precio,
                iva:producto.iva,
                imagen
            })
            return productoActualizado
        }else{
            throw new Error("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new Error("error:",error)
    }
}

const eliminarProducto= async (id)=>{
    try {
        const productoEncontrado= await producto.findByPk(id)
        if(productoEncontrado){
            const productoEliminado= await productoEncontrado.destroy()
            return productoEliminado
        }else{
            throw new Error("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new Error("error:",error)
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
            throw new Error("no se ha encontrado el producto")
        }
    } catch (error) {
        throw new Error("error:",error)
    }
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}