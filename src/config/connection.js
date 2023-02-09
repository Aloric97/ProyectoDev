
//importing libraries from the modules
const {Sequelize}= require('sequelize')

//importing config
const {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST,DB_DIALECT}= require('../config/env')

//import models and associations

const connection = new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port:3306,
});


module.exports= connection