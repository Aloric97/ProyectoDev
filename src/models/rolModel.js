const {DataTypes}= require('sequelize')

//import connection
const connection = require('../config/connection')

const role= connection.define('role',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    }},{
    timestamps:false
})

module.exports= role