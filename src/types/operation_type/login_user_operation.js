const { loginUserInput } = require("../api_input_types/login_user_input");
const { loginUserPayload } = require("../api_payload_types/login_user_payload");

const loginUserOperation = {
    type: "POST",
    endpoint: "/api/users/login",
    description: "Authenticates a user and returns a JWT token",
    requestBody: loginUserInput,
    responseBody: loginUserPayload
};

module.exports = {
    loginUserOperation
};
