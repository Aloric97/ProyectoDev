const usuarioRepository = require('../repositories/usuarioRepository')

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioRepository.obtenerUsuarios()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const idUsuario=req.params.id
        const usuario = await usuarioRepository.obtenerUsuario(idUsuario)
        res.json(usuario)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario
}
