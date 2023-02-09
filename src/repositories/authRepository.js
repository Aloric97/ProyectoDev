//importing libraries
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

//importing config
const {TOKEN_KEY,EXPIRES}= require('../config/env')

//importing models
const user = require('../models/userModel')
const role = require('../models/rolModel')
const role_user = require('../models/role_user')

const AppError = require('../utils/apiError')
const connection = require('../config/connection')


//create user
const register = async ({ firstname, lastname, email, password }) => {
    if (!(firstname && lastname && password && email)) {
        throw new AppError('All fields are required(firstname, lastname, password y email)', 422, 1);
    }

    const existingUser = await user.findOne({ where: { email: email } });
    if (existingUser) {
        throw new AppError('This user already exists', 400, 2);
    }

    const execute = await connection.transaction()

    try {
        let salt = bcrypt.genSaltSync(10)
        let newPassword = bcrypt.hashSync(password, salt)
        const newUser = await user.create({ firstname: firstname, lastname: lastname, email: email, password: newPassword }, { transaction: execute });
        //add user and rol into the table role_user
        const [row, created] = await role.findOrCreate({ where: { name: 'user' } })

        //create token
        const token = jwt.sign(
            { user_id: newUser.id, email:newUser.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )

        await role_user.create({ userId: newUser.id, roleId: row.id }, { transaction: execute })
        await execute.commit()

        return {newUser:newUser,token:token}


    } catch (error) {
        await execute.rollback()
        console.log(error)
        throw new AppError(`Error assigning role: ${error}`, 500, 4);
    }

}

//login user

const login = async(email, password) => {

    if(!(email && password)) {
        throw new AppError('password and email must not be empty', 400, 2)
    }

    const userFound = await user.findOne({where:{email: email}})
 
    if(!userFound){
        throw new AppError(`This email doesnt exists`, 400, 2)
    }

    const verifyPassword = bcrypt.compareSync(password,userFound.password)

    if (!verifyPassword) {
        throw new AppError('the password is incorrect', 400, 2)
    }

    const token = jwt.sign({ id: userFound.id },TOKEN_KEY, {
        expiresIn: 86400, // 24 hours
    });

    const options={
        expires: new Date(Date.now()+ 1*60*60*1000),
        httpOnly:true
    }

    return {token,options}
}

module.exports = {
    register,
    login
}