//crear un middleware para aceptar solo usuarios

const rol_user =require('../models/role_user')
const rol =require('../models/rolModel')
const jwt= require('jsonwebtoken')
const {TOKEN_KEY}= require('../config/env')


const isCommon = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      const user =  jwt.verify(token, TOKEN_KEY);
      

      //busco el id desde la tabla role user
      const roles = await rol_user.findOne({where:{userId: user.id}})
      .then(data => data.roleId);

      //luego, busco el id del rol 
      const findRole = await rol.findOne({where:{id:roles}});


      if (findRole.name === "user") {
        next();
      }else{
        return res.status(403).json({ message: "Debe tener el rol de usuario!" })
      }
    } catch (error) {
      return res.status(500).send({ message:'Debe estar logueado'});
    }
};

module.exports=isCommon