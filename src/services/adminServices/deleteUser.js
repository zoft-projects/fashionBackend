const users = require("../../database/models/users/users")

exports.deleteUser=async(id)=>{
    try{
        deleteUser=await users.findOneAndDelete({ _id: id })
        return this.deleteUser
    }
    catch(error){
        throw error
    }
}