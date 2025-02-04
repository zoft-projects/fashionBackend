const userRoleEnum = require("../../enum/userRoleEnum")

const registerUserInput={
    username: "string",   
    email: "string",      
    password: "string",   
    role: userRoleEnum,   
    image: {
        fname: "string",  
        type: "string",   
        data: "Buffer"    
    }
}

module.exports={
    registerUserInput
}