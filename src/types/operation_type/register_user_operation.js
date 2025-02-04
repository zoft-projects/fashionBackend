const { registerUserInput } = require("../api_input_types/register_user_input");
const { registerUserPayload } = require("../api_payload_types/register_user_payload");

const registerUserOperation = {
    type: "POST",
    endpoint: "/api/users/register",
    description: "Registers a new user in the system",
    requestBody: registerUserInput,
    responseBody: registerUserPayload
};
module.exports = {
    registerUserOperation
};
