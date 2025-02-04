const { addProduct } = require("./addProduct");
const { deleteProduct } = require("./deleteProduct");
const { updateProduct } = require("./editProduct");
const { getAllProducts } = require("./getProduct");
const { getProductByCategory } = require("./getProductByCategory");
const { getProductById } = require("./getProductsById");

module.exports={
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByCategory
}