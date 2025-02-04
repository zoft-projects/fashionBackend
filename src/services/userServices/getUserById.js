const users = require("../../database/models/users/users")

exports.getUserById=async(id)=>{
    try{
        const userById=await users.findById(id)
        return userById
    }
    catch(error){
        throw error
    }
}