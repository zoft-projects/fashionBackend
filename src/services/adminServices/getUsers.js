const users = require("../../database/models/users/users")

exports.getUsers=async()=>{
    try{
        const allUsers=await users.find()
        return allUsers
    }
    catch(error){
        throw error
    }
}