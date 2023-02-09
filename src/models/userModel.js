//importing libraries from modules
const {DataTypes}= require('sequelize')
const connection= require('../config/connection')

//importing rol
const rol = require('./rolModel')


const user = connection.define('user',{
    firstname:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [3,25]
        }
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [3,25]
        }
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate:{
            isEmail:true,
            len: [8,50]
        }
    
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [8,250]
        }
    }},{ timestamps: false }
)





module.exports=user