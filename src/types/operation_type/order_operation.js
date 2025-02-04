const { createOrderInput } = require("../api_input_types/order_input");
const { createOrderPayload } = require("../api_payload_types/order_payload");

const createOrderOperation = {
    type: "POST",                             
    endpoint: "/api/users/add_order",      
    description: "Creates a new order in the system",
    requestBody: createOrderInput,          
    responseBody: createOrderPayload      
};

module.exports = {
    createOrderOperation
};
