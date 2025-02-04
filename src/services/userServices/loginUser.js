const users = require("../../database/models/users/users");
const bcrypt=require('bcrypt')

exports.loginUser=async(email,password)=>{
    try{
        const user = await users.findOne({ email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return user;
            } 
        }
        return null
    }
    catch(err){
        throw err;
    }
}