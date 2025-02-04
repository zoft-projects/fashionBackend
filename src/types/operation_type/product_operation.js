const { createProductInput } = require("../api_input_types/create_product_input");
const { getProductInput, updateProductInput } = require("../api_input_types/product_input");
const { createProductPayload } = require("../api_payload_types/create_product_payload");
const { getAllProductsPayload, getProductPayload, updateProductPayload } = require("../api_payload_types/product_payload");

const createProductOperation = {
    type: "POST",                             
    endpoint: "/api/admin/add",      
    description: "Creates a new product in the system",
    requestBody: createProductInput,          
    responseBody: createProductPayload      
};

const getAllProductsOperation = {
    type: "GET",
    endpoint: "/api/users/get_products",
    description: "Retrieves all products from the system",
    responseBody: getAllProductsPayload,
  };

const getProductByIdOperation = {
    type: "GET",
    endpoint: "/api/get_products/:id",
    description: "Retrieves a product by its ID from the system",
    requestBody: getProductInput,  
    responseBody: getProductPayload,
  };


const updateProductOperation = {
    type: "PUT",
    endpoint: "/api/admin/edit_product/:id",
    description: "Updates an existing product in the system",
    requestBody: updateProductInput,
    responseBody: updateProductPayload,
  };
module.exports = {
    createProductOperation,
    getAllProductsOperation,
    getProductByIdOperation,
    updateProductOperation
};
