const users = require("../../database/models/users/users")

exports.registerUser=async(data)=>{
    try{
        const newUser=new users(data)
        await newUser.save()
        return newUser
    }
    catch(error){
        throw error
    }
}