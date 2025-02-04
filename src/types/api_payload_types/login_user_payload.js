const userRoleEnum = require("../../enum/userRoleEnum");

const loginUserPayload={
    uid: "string",        
    username: "string",   
    email: "string",     
    role: userRoleEnum,       
    token: "string" 
}

module.exports={
    loginUserPayload
}