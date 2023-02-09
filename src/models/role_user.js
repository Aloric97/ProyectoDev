
//import connection
const connection = require('../config/connection')

//import models
const user = require('./userModel')
const role = require('./rolModel')


const role_user = connection.define('user_role', {}, { timestamps: false });


user.belongsToMany(role, { through: role_user });
role.belongsToMany(user, { through: role_user });


module.exports = role_user
