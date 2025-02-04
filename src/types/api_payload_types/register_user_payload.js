const userRoleEnum = require("../../enum/userRoleEnum");

const registerUserPayload = {
    _id: "string",       
    username: "string",
    email: "string",     
    role: userRoleEnum,  
    image: {
        fname: "string", 
        type: "string",  
        data: "Buffer"   
    },
    createdAt: "Date", 
    updatedAt: "Date"    
};

module.exports = {
    registerUserPayload
};
