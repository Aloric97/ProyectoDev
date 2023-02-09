

const usuario= require('../models/userModel')
const roles= require('../models/rolModel')

//mostrar todos los usuario

const obtenerUsuarios= async ()=>{
    try {
    //incluir el rol
    const usuarios= await usuario.findAll({
        include: {
            model: roles,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return usuarios

    } catch (error) {

        throw new Error("error:",error)
    }
}

//mostrar un usuario

const obtenerUsuario= async (id)=>{
    try {
        const usuarioEncontrado= await usuario.findByPk(id)
        return usuarioEncontrado
    } catch (error) {
        throw new Error("error:",error)
    }
}

module.exports ={
    obtenerUsuarios,
    obtenerUsuario
}