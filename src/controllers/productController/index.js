const { addProduct } = require("./addProducts");
const { deleteProduct } = require("./deleteProduct");
const { updateProduct } = require("./editProduct");
const { getProductByid } = require("./getProductById");
const { getAllProducts } = require("./getProducts");

module.exports={
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductByid
}