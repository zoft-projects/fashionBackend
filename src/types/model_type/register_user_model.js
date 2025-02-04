const userRoleEnum = require("../../enum/userRoleEnum");

const registerUserSchemaType = {
    username: "string", 
    email: "string", 
    password: "string", 
    role: userRoleEnum.user, 
    image: {
        fname: "string", 
        type: "string",
        data: "buffer", 
    },
    createdAt: new Date(), 
    updatedAt: new Date()  
};

module.exports = {
    registerUserSchemaType
};
