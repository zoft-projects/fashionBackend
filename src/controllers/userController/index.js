const { getUserById } = require("./getUserById");
const { loginUser } = require("./loginUser");
const { registerUser } = require("./registerUser");
const { updateProfile } = require("./updateProfile");

module.exports={
    registerUser,
    loginUser,
    getUserById,
    updateProfile
}