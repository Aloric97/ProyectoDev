
//importing libraries
const authRepository = require('../repositories/authRepository')



const register = async (req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;
        const newUser = await authRepository.register({firstname, lastname, email, password});

        return res.status(201).json({success:true, data:newUser.newUser, token:newUser.token})

    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

const login= async (req, res) => {
    try {
        const {email, password} = req.body

        const signUser= await authRepository.login(email, password)
        return res
                .status(200)
                .cookie("token",signUser.token,signUser.options)
                .json({success:true,token:signUser.token})
                

    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
}}

//logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res
                .status(200)
                .json({success:true, message:"Logout successfully"})
    } catch (error) {
        if ((error.status)){
            return res
                    .status(error.status)
                    .json({message: error.message})
        }
        return res
                .json({message: error.message})
    }
}

module.exports = {
    register,
    login,
    logout
}
