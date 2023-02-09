const {DataTypes}= require('sequelize')


const connection= require('../config/connection')


const producto= connection.define('producto',{
    id_producto:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            is:/^[A-Za-z\s]*$/
        }
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isNumeric:true
        }
    },
    precio:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        validate:{
            isNumeric:true
        }
    },
    iva:{
        type:DataTypes.DECIMAL(3,2),
        defaultValue:0.21,
        
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:true,
    }},
    {
        timestamps:false
})



module.exports= producto