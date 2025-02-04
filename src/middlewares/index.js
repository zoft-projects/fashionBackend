const { identityMiddleware } = require("./adminMiddleware/identityMiddleware");
const { authenticationMiddleware } = require("./userMiddleware/authenticationMiddleware");

module.exports={
    authenticationMiddleware,
    identityMiddleware    
}